'use server';

import { generateProductDetails } from '@/ai/flows/generate-product-details';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const productsPath = path.join(process.cwd(), 'src', 'lib', 'data', 'products.json');
const imagesPath = path.join(process.cwd(), 'src', 'lib', 'placeholder-images.json');


const fileSchema = z.custom<File>()
    .refine((file) => file instanceof File && file.size > 0, 'A file is required.')
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 4MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp files are accepted."
    );

const generateFormSchema = z.object({
  keywords: z.string().min(3, 'Please provide some keywords.'),
  image1: fileSchema,
  image2: z.custom<File>().optional(),
  image3: z.custom<File>().optional(),
});

async function fileToDataUri(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    return `data:${file.type};base64,${base64}`;
}

export async function generateDetailsAction(prevState: any, formData: FormData) {
  const intent = formData.get('intent');
  if (intent !== 'generate') {
    return {
      ...prevState,
      message: 'Wrong intent.'
    };
  }
  
  const validatedFields = generateFormSchema.safeParse({
    keywords: formData.get('keywords'),
    image1: formData.get('image1'),
    image2: formData.get('image2'),
    image3: formData.get('image3'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      generatedDetails: null,
    };
  }

  const { keywords, image1, image2, image3 } = validatedFields.data;

  try {
    const image1DataUri = await fileToDataUri(image1);
    const image2DataUri = image2 && image2.size > 0 ? await fileToDataUri(image2) : undefined;
    const image3DataUri = image3 && image3.size > 0 ? await fileToDataUri(image3) : undefined;

    const result = await generateProductDetails({
        keywords,
        image1DataUri,
        image2DataUri,
        image3DataUri,
    });
    
    return {
      message: 'Product details generated successfully.',
      errors: null,
      generatedDetails: result,
    };
  } catch (error) {
    console.error('Error generating product details:', error);
    return {
      message: 'An error occurred while generating the details. Please try again.',
      errors: null,
      generatedDetails: null,
    };
  }
}

const saveProductSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  seoTags: z.string().optional(),
  keywords: z.string().optional(),
  image1: fileSchema,
  image2: z.custom<File>().optional(),
  image3: z.custom<File>().optional(),
});

export async function formAction(prevState: any, formData: FormData) {
  const intent = formData.get('intent');
  if (intent === 'generate') {
    return generateDetailsAction(prevState, formData);
  }
  return {
    ...prevState,
    message: 'Unknown intent.'
  };
}

export async function saveProductAction(formData: FormData) {
  const cookieStore = cookies();
  const authSession = cookieStore.get('auth-session');
  
  if (!authSession || !authSession.value.startsWith('artisan:')) {
    throw new Error('Authentication required. Please log in.');
  }
  const artisanId = authSession.value.split(':')[1];

  const validatedFields = saveProductSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    seoTags: formData.get('seoTags'),
    keywords: formData.get('keywords'),
    image1: formData.get('image1'),
    image2: formData.get('image2'),
    image3: formData.get('image3'),
  });

  if (!validatedFields.success) {
    throw new Error(`Invalid product data submitted: ${JSON.stringify(validatedFields.error.flatten().fieldErrors)}`);
  }

  const { title, description, keywords } = validatedFields.data;
  const imageFiles = [validatedFields.data.image1, validatedFields.data.image2, validatedFields.data.image3].filter(Boolean) as File[];

  try {
    // 1. Read existing data
    const productsData = JSON.parse(await fs.readFile(productsPath, 'utf-8'));
    const imagesData = JSON.parse(await fs.readFile(imagesPath, 'utf-8'));
    
    const newImageIds: string[] = [];
    const keywordsList = keywords?.split(',').map(k => k.trim()) || [];
    const firstKeyword = keywordsList[0] || 'product photo';

    // 2. "Upload" images by converting them to data URIs and adding to placeholder-images.json
    for (const file of imageFiles) {
        const dataUri = await fileToDataUri(file);
        const newImageId = `prod-img-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        imagesData.placeholderImages.push({
            id: newImageId,
            description: `A photo of ${title}`,
            imageUrl: dataUri,
            imageHint: firstKeyword
        });
        newImageIds.push(newImageId);
    }
    
    // 3. Create new product object
    const newProductId = `prod-${Date.now()}`;
    const newProduct = {
      id: newProductId,
      name: title,
      artisanId: artisanId,
      categoryId: 'new', // Or try to infer from keywords
      price: Math.floor(Math.random() * 100) + 20, // Assign a random price for now
      rating: 0,
      reviewCount: 0,
      description: description,
      story: `Inspired by ${keywords || 'my craft'}, this piece is a new addition to my collection.`,
      imageIds: newImageIds,
    };

    productsData.push(newProduct);

    // 4. Write back to files
    await fs.writeFile(productsPath, JSON.stringify(productsData, null, 2));
    await fs.writeFile(imagesPath, JSON.stringify(imagesData, null, 2));

    // Revalidate paths to show the new product
    revalidatePath('/marketplace');
    revalidatePath('/dashboard-artisan/products');

  } catch (error) {
    console.error('Error saving product:', error);
    throw new Error('An internal error occurred while saving the product.');
  }

  // 5. Redirect on success
  redirect('/dashboard-artisan/products');
}
