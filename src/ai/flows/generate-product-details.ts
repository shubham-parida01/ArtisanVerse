'use server';

/**
 * @fileOverview An AI agent that generates product details from images and keywords.
 *
 * - generateProductDetails - A function that handles the product detail generation process.
 * - GenerateProductDetailsInput - The input type for the generateProductDetails function.
 * - GenerateProductDetailsOutput - The return type for the generateProductDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDetailsInputSchema = z.object({
  keywords: z.string().describe('A few keywords describing the product.'),
  image1DataUri: z.string().describe("A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  image2DataUri: z.string().optional().describe("An optional second photo of the product as a data URI."),
  image3DataUri: z.string().optional().describe("An optional third photo of the product as a data URI."),
});
export type GenerateProductDetailsInput = z.infer<typeof GenerateProductDetailsInputSchema>;

const GenerateProductDetailsOutputSchema = z.object({
  title: z.string().describe('A catchy, artisan-style product title.'),
  description: z.string().describe('A 2-paragraph, artisan-style product description.'),
  seoTags: z.array(z.string()).describe('An array of 8-10 SEO-friendly tags.'),
});
export type GenerateProductDetailsOutput = z.infer<typeof GenerateProductDetailsOutputSchema>;

export async function generateProductDetails(input: GenerateProductDetailsInput): Promise<GenerateProductDetailsOutput> {
  return generateProductDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDetailsPrompt',
  input: {schema: GenerateProductDetailsInputSchema},
  output: {schema: GenerateProductDetailsOutputSchema},
  prompt: `You are an expert in e-commerce marketing for handcrafted goods. Your task is to generate compelling product details based on images and keywords provided by an artisan.

Analyze the following images and keywords to create a product title, description, and SEO tags.

Keywords: {{{keywords}}}

Image 1: {{media url=image1DataUri}}
{{#if image2DataUri}}Image 2: {{media url=image2DataUri}}{{/if}}
{{#if image3DataUri}}Image 3: {{media url=image3DataUri}}{{/if}}

Instructions:
1.  **Product Title:** Create a catchy, artisan-style title for the product.
2.  **Product Description:** Write a 2-paragraph description in a warm, artisan style. The first paragraph should describe the product's appearance and materials. The second paragraph should tell a brief story about its creation or inspiration, connecting with the artisan spirit.
3.  **SEO Tags:** Suggest 8-10 SEO-friendly tags that are relevant to the product.
`,
});

const generateProductDetailsFlow = ai.defineFlow(
  {
    name: 'generateProductDetailsFlow',
    inputSchema: GenerateProductDetailsInputSchema,
    outputSchema: GenerateProductDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
