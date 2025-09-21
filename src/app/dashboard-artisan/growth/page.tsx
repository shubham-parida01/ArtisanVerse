'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateGrowthInsights } from "@/ai/flows/generate-growth-insights";
import { salesData, trafficData } from "@/lib/data";
import { Loader2, Lightbulb, ArrowRight } from "lucide-react";

interface GrowthInsights {
  insights: string[];
  nextSteps: string[];
}

function InsightsLoading() {
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating your personalized insights...</p>
        </div>
    )
}


export default function GrowthPage() {
    const [insights, setInsights] = useState<GrowthInsights | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchInsights() {
            setIsLoading(true);
            setError(null);
            try {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                // In a real app, you'd fetch this data dynamically
                const formattedSalesData = salesData.map((d, i) => ({ date: new Date(new Date().setDate(new Date().getDate() - (salesData.length - i))).toISOString().split('T')[0], revenue: d.revenue }));
                const formattedTrafficData = trafficData.map(d => ({...d, date: d.date.toISOString().split('T')[0]}));

                const result = await generateGrowthInsights({
                    salesData: formattedSalesData,
                    trafficData: formattedTrafficData,
                });
                setInsights(result);
            } catch (e) {
                console.error(e);
                setError("Sorry, we couldn't generate your insights right now. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchInsights();
    }, []);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Growth & Analytics</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="text-accent" />
                        AI-Powered Growth Insights
                    </CardTitle>
                    <CardDescription>
                        Personalized tips and next steps based on your last 30 days of activity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && <InsightsLoading />}
                    {error && <p className="text-destructive text-center p-8">{error}</p>}
                    {insights && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Key Insights</h3>
                                <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                                    {insights.insights.map((insight, index) => (
                                        <li key={`insight-${index}`}>{insight}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Actionable Next Steps</h3>
                                <ul className="space-y-3">
                                    {insights.nextSteps.map((step, index) => (
                                        <li key={`step-${index}`} className="flex items-start gap-3 p-3 bg-muted rounded-md">
                                           <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" /> 
                                           <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
