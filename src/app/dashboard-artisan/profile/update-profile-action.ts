
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// The path to the JSON file we will write to.
const artisansJsonPath = path.join(process.cwd(), 'src', 'lib', 'data', 'artisans.json');

const formSchema = z.object({
  artisanId: z.string(),
  artisanName: z.string().min(2, 'Artisan name must be at least 2 characters.'),
  craftType: z.string().optional(),
  region: z.string().optional(),
  style: z.string().optional(),
  bio: z.string().optional(),
});

export interface UpdateProfileState {
    message: string | null;
    errors: Record<string, string[] | undefined> | null;
}

async function readArtisansData(): Promise<{ artisans: any[] }> {
  try {
    const data = await fs.readFile(artisansJsonPath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData || { artisans: [] };
  } catch (error) {
    console.error('Failed to read artisan credentials:', error);
    return { artisans: [] };
  }
}

export async function updateProfileAction(prevState: UpdateProfileState, formData: FormData): Promise<UpdateProfileState> {
  const validatedFields = formSchema.safeParse({
    artisanId: formData.get('artisanId'),
    artisanName: formData.get('artisanName'),
    craftType: formData.get('craftType'),
    region: formData.get('region'),
    style: formData.get('style'),
    bio: formData.get('bio'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const { artisanId, artisanName, craftType, region, style, bio } = validatedFields.data;
    
    const artisansData = await readArtisansData();
    const artisans = artisansData.artisans;

    const artisanIndex = artisans.findIndex((a: any) => a.id === artisanId);

    if (artisanIndex === -1) {
        return { message: 'Artisan not found.', errors: null };
    }
    
    const existingArtisan = artisans[artisanIndex];

    // Update the profile fields in our credentials list
    // Preserve existing data if the form field was submitted as empty/undefined
    artisans[artisanIndex] = {
        ...existingArtisan,
        name: artisanName,
        craft: craftType || existingArtisan.craft,
        region: region || existingArtisan.region,
        style: style || existingArtisan.style,
        bio: bio || existingArtisan.bio
    };

    // Write the updated credentials back to the JSON file
    await fs.writeFile(artisansJsonPath, JSON.stringify({ artisans: artisans }, null, 2));
    
    revalidatePath('/dashboard-artisan/profile');
    revalidatePath(`/artisans/${artisanId}`); // Revalidate the public profile page too

    return {
      message: 'Profile updated successfully!',
      errors: null,
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      message: 'An unexpected error occurred while saving. Please try again.',
      errors: null,
    };
  }
}
