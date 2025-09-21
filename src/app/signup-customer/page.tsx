'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function SignupCustomerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined> | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors(null);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/signup-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors);
        toast({ variant: "destructive", title: "Signup Failed", description: result.message || "An error occurred." });
      } else {
        toast({ title: "Welcome!", description: "Your account has been created. Please log in." });
        router.push('/login-customer');
      }
    } catch (error) {
       toast({ variant: "destructive", title: "Signup Failed", description: "A network error occurred. Please try again." });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-sm px-4 py-12 md:px-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Create a Customer Account</CardTitle>
          <CardDescription className="text-lg">Join the ArtisanVerse community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="e.g., Alex Doe" required disabled={isLoading} />
                 {errors?.name && <p className="text-sm font-medium text-destructive">{errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required disabled={isLoading} />
               {errors?.email && <p className="text-sm font-medium text-destructive">{errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required disabled={isLoading} />
               {errors?.password && <p className="text-sm font-medium text-destructive">{errors.password[0]}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
            </Button>
            <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/login-customer" className="font-medium text-primary hover:underline">
                    Log in
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
