import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { hashPassword } from '@/lib/bcrypt';

const artisansPath = path.join(process.cwd(), 'src', 'lib', 'data', 'artisans.json');

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

async function readArtisans() {
    try {
        const data = await fs.readFile(artisansPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return a default structure
        return { artisans: [] };
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = signupSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ 
        message: 'Invalid form data.', 
        errors: validatedFields.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { name, email, password } = validatedFields.data;
    const artisansData = await readArtisans();
    const artisans = artisansData.artisans || [];

    const existingArtisan = artisans.find((a: any) => a.email === email);
    if (existingArtisan) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newArtisan = {
      id: `art-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: 'artisan'
    };

    artisans.push(newArtisan);
    await fs.writeFile(artisansPath, JSON.stringify({ artisans: artisans }, null, 2));

    return NextResponse.json({ message: 'Signup successful! You can now log in.' }, { status: 201 });

  } catch (error) {
    console.error("Artisan Signup API Error:", error);
    return NextResponse.json({ message: 'An unexpected error occurred during signup.' }, { status: 500 });
  }
}
