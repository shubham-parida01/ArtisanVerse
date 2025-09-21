import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">Support Center</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're here to help. Find answers to your questions or get in touch with our team.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold font-headline mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">What is ArtisanVerse?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                ArtisanVerse is a global marketplace for authentic, handcrafted goods. We connect talented artisans with customers who appreciate unique, story-rich products.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">How do I track my order?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Once your order has shipped, you will receive an email with tracking information. You can also view your order status in your user account dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">What is your return policy?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Due to the unique nature of handcrafted items, return policies may vary by artisan. Please check the individual product page and artisan profile for specific return information before purchasing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">How do you select your artisans?</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                We have a curation process where we review each artisan's application to ensure their work aligns with our values of authenticity, quality craftsmanship, and ethical production.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Can't find an answer? Send us a message.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
