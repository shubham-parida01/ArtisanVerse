import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { comparePassword } from '@/lib/bcrypt';

const customersPath = path.join(process.cwd(), 'src', 'lib', 'data', 'customers.json');

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string(),
});

async function readCustomers() {
    try {
        const data = await fs.readFile(customersPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, it's not a server error, but no users exist.
        return [];
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedFields = loginSchema.safeParse(body);

        if (!validatedFields.success) {
            // Use a 400 Bad Request for validation errors.
            return NextResponse.json({ message: 'Invalid email or password format.' }, { status: 400 });
        }

        const { email, password } = validatedFields.data;
        const customers = await readCustomers();
        const customer = customers.find((c: any) => c.email === email);

        if (!customer) {
            // Use a 401 Unauthorized for authentication failures.
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        const isPasswordValid = await comparePassword(password, customer.password);

        if (!isPasswordValid) {
            // Use a 401 for authentication failures.
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }
        
        const response = NextResponse.json({ success: true, message: "Login successful" });
        
        // Set a secure, httpOnly cookie to manage the session
        response.cookies.set('auth-session', `customer:${customer.id}`, { path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });

        return response;

    } catch (error) {
        console.error("Customer Login API Error:", error);
        // Use a 500 Internal Server Error for unexpected issues.
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}
