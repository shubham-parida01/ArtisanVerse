import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { comparePassword } from '@/lib/bcrypt';

const artisansPath = path.join(process.cwd(), 'src', 'lib', 'data', 'artisans.json');

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string(),
});

async function readArtisans() {
    try {
        const data = await fs.readFile(artisansPath, 'utf-8');
        const jsonData = JSON.parse(data);
        return jsonData.artisans || []; // Correctly return the nested array
    } catch (error) {
        console.error("Failed to read or parse artisans.json:", error);
        return [];
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedFields = loginSchema.safeParse(body);

        if (!validatedFields.success) {
            return NextResponse.json({ message: 'Invalid email or password format.' }, { status: 400 });
        }

        const { email, password } = validatedFields.data;
        const artisans = await readArtisans();
        const artisan = artisans.find((a: any) => a.email === email);

        if (!artisan) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        const isPasswordValid = await comparePassword(password, artisan.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }
        
        const response = NextResponse.json({ success: true, message: "Login successful" });
        
        response.cookies.set('auth-session', `artisan:${artisan.id}`, { path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

        return response;

    } catch (error) {
        console.error("Artisan Login API Error:", error);
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}
