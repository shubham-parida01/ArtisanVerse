import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { hashPassword } from '@/lib/bcrypt';

const customersPath = path.join(process.cwd(), 'src', 'lib', 'data', 'customers.json');

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
});

async function readCustomers() {
    try {
        const data = await fs.readFile(customersPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
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
    const customers = await readCustomers();
    
    const existingCustomer = customers.find((c: any) => c.email === email);
    if (existingCustomer) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newCustomer = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: 'customer'
    };

    customers.push(newCustomer);
    await fs.writeFile(customersPath, JSON.stringify(customers, null, 2));

    return NextResponse.json({ message: 'Signup successful! You can now log in.' }, { status: 201 });

  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ message: 'An unexpected error occurred during signup.' }, { status: 500 });
  }
}
