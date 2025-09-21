'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { generateInstagramPost } from '@/ai/flows/generate-instagram-post';
import { useToast } from '@/hooks/use-toast';

interface GeneratePostDialogProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GeneratePostDialog({ product, isOpen, onOpenChange }: GeneratePostDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      handleGeneration();
    } else {
        // Reset state when dialog closes
        setGeneratedPost('');
        setIsLoading(false);
    }
  }, [isOpen]);

  const handleGeneration = async () => {
    setIsLoading(true);
    setGeneratedPost('');
    try {
      const result = await generateInstagramPost({
        productName: product.name,
        productDescription: product.description,
        // Assuming tags might exist on the product in the future
        // tags: product.tags || [], 
      });
      setGeneratedPost(result.post);
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the social media post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setIsCopied(true);
    toast({
        title: "Copied!",
        description: "The post has been copied to your clipboard.",
    })
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Social Media Post</DialogTitle>
          <DialogDescription>
            An AI-generated post for '{product.name}'. You can copy and use it on your social media.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading && (
            <div className="flex items-center justify-center h-40 bg-muted rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {generatedPost && (
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                {generatedPost}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleCopyToClipboard}
            disabled={!generatedPost || isLoading}
          >
            {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
