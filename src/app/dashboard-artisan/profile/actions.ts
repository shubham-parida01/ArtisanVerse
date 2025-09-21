'use server';

import { generateArtisanBio } from '@/ai/flows/generate-artisan-bio';
import { z } from 'zod';

const formSchema = z.object({
  artisanName: z.string().min(2, 'Artisan name must be at least 2 characters.'),
  craftType: z.string().min(2, 'Craft type must be at least 2 characters.'),
  region: z.string().min(2, 'Region must be at least 2 characters.'),
  style: z.string().min(2, 'Style must be at least 2 characters.'),
  background: z.string().min(10, 'Background must be at least 10 characters.'),
});

export async function generateBioAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    artisanName: formData.get('artisanName'),
    craftType: formData.get('craftType'),
    region: formData.get('region'),
    style: formData.get('style'),
    background: formData.get('background'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      generatedBio: null,
    };
  }

  try {
    const result = await generateArtisanBio(validatedFields.data);
    return {
      message: 'Bio generated successfully.',
      errors: null,
      generatedBio: result.bio,
    };
  } catch (error) {
    console.error('Error generating bio:', error);
    return {
      message: 'An error occurred while generating the bio. Please try again.',
      errors: null,
      generatedBio: null,
    };
  }
}
