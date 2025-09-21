import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function JoinPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Become an Artisan</CardTitle>
          <CardDescription className="text-lg">
            Join our global community and share your craft with the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="e.g., Elena Vance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="craftType">Primary Craft</Label>
              <Select>
                <SelectTrigger id="craftType">
                  <SelectValue placeholder="Select your craft" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pottery">Pottery</SelectItem>
                  <SelectItem value="textiles">Textiles</SelectItem>
                  <SelectItem value="woodwork">Woodwork</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Your Region</Label>
              <Input id="region" placeholder="e.g., Tuscany, Italy" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Tell Us About Yourself</Label>
              <Textarea 
                id="background" 
                placeholder="Share a little about your background, inspiration, and techniques. Our AI assistant can help you refine this later!" 
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="portfolio">Link to Portfolio or Social Media (Optional)</Label>
              <Input id="portfolio" placeholder="https://instagram.com/your_craft" />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
