'use server';

import { suggestProductNarrative, SuggestProductNarrativeInput } from '@/ai/flows/suggest-product-narrative';
import { z } from 'zod';

const formSchema = z.object({
  productName: z.string().min(2, 'Product name must be at least 2 characters.'),
  productDescription: z.string().min(10, 'Product description must be at least 10 characters.'),
  artisanBackground: z.string().min(10, 'Artisan background must be at least 10 characters.'),
});

export async function generateStoryAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    productName: formData.get('productName'),
    productDescription: formData.get('productDescription'),
    artisanBackground: formData.get('artisanBackground'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      generatedNarrative: null,
    };
  }

  try {
    const result = await suggestProductNarrative(validatedFields.data);
    return {
      message: 'Narrative generated successfully.',
      errors: null,
      generatedNarrative: result.narrative,
    };
  } catch (error) {
    console.error('Error generating narrative:', error);
    return {
      message: 'An error occurred while generating the narrative. Please try again.',
      errors: null,
      generatedNarrative: null,
    };
  }
}
