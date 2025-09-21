'use server';

/**
 * @fileOverview An AI agent that generates growth insights for artisans.
 *
 * - generateGrowthInsights - A function that handles the insight generation process.
 * - GenerateGrowthInsightsInput - The input type for the generateGrowthInsights function.
 * - GenerateGrowthInsightsOutput - The return type for the generateGrowthInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGrowthInsightsInputSchema = z.object({
  salesData: z.array(z.object({
    date: z.string(),
    revenue: z.number(),
  })).describe('The sales data for the last 30 days.'),
  trafficData: z.array(z.object({
    date: z.string(),
    views: z.number(),
  })).describe('The profile and product traffic data for the last 30 days.'),
});
export type GenerateGrowthInsightsInput = z.infer<typeof GenerateGrowthInsightsInputSchema>;

const GenerateGrowthInsightsOutputSchema = z.object({
  insights: z.array(z.string()).describe('An array of 3 personalized, data-driven insights.'),
  nextSteps: z.array(z.string()).describe('An array of 2 actionable next steps the artisan can take.'),
});
export type GenerateGrowthInsightsOutput = z.infer<typeof GenerateGrowthInsightsOutputSchema>;

export async function generateGrowthInsights(input: GenerateGrowthInsightsInput): Promise<GenerateGrowthInsightsOutput> {
  return generateGrowthInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGrowthInsightsPrompt',
  input: {schema: GenerateGrowthInsightsInputSchema},
  output: {schema: GenerateGrowthInsightsOutputSchema},
  prompt: `You are an expert e-commerce analyst and business coach for artisans. Your task is to analyze the provided sales and traffic data for an artisan and generate insightful, personalized advice.

Here is the data for the last 30 days:
Sales Data: {{json salesData}}
Traffic Data: {{json trafficData}}

Instructions:
1.  **Analyze the Data:** Look for trends, correlations, peaks, and troughs in both sales and traffic. Is there a day of the week when sales are highest? Does a spike in traffic correlate with a spike in sales?
2.  **Generate 3 Personalized Insights:** Based on your analysis, create three distinct, bullet-point insights. These should be observations about their business performance, framed in an encouraging and easy-to-understand way.
3.  **Suggest 2 Actionable Next Steps:** Provide two concrete, actionable steps the artisan can take to build on their successes or address areas for improvement. These should be practical and directly related to the insights.
4.  **Format the Output:** Return the insights and next steps in the specified JSON format.
`,
});

const generateGrowthInsightsFlow = ai.defineFlow(
  {
    name: 'generateGrowthInsightsFlow',
    inputSchema: GenerateGrowthInsightsInputSchema,
    outputSchema: GenerateGrowthInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
