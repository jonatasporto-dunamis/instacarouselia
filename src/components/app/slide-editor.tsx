'use client';

import {
  Download,
  Image as ImageIcon,
  LayoutTemplate,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { Slide } from '@/lib/types';
import { findImage } from '@/lib/imageApi';
import { useTransition } from 'react';
import { TemplatePicker } from './template-picker';
import { TemplateId } from '@/lib/templates/types';
import { getSmartFallbackImage } from '@/lib/imageFallback';

type SlideEditorProps = {
  slide: Slide;
  onUpdate: (id: string, updatedProps: Partial<Slide>) => void;
};

export function SlideEditor({ slide, onUpdate }: SlideEditorProps) {
  const { toast } = useToast();
  const [isFetching, startFetching] = useTransition();

  const handleExport = () => {
    toast({
      title: 'Exporting Carousel',
      description: 'Your carousel is being prepared for download.',
    });
    console.log('Exporting carousel...');
  };

  const handleFetchImage = (useFallback: boolean = false) => {
    const query = slide.imagePrompt || slide.title;
    if (!query) {
      toast({
        variant: 'destructive',
        title: 'No Image Suggestion',
        description: 'The AI did not provide a suggestion for this slide.',
      });
      return;
    }

    startFetching(async () => {
      try {
        toast({
          title: 'Fetching Image...',
          description: `Searching for "${query}"`,
        });

        let result;
        if (useFallback) {
          result = await getSmartFallbackImage({ query });
        } else {
          const apiKeys = {
            unsplash: localStorage.getItem('image.unsplash.key') || undefined,
            pexels: localStorage.getItem('image.pexels.key') || undefined,
            pixabay: localStorage.getItem('image.pixabay.key') || undefined,
            bing: localStorage.getItem('image.bing.key') || undefined,
          };
           result = await findImage(query, apiKeys);
        }

        onUpdate(slide.id, { 
            imageUrl: result.imageUrl, 
            imageHint: result.altText,
            imageProvider: result.provider 
        });

        toast({
          title: 'Image Updated!',
          description: `Loaded image from ${result.provider}.`,
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Image Search Failed',
          description:
            error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <div className="mt-6 space-y-6">
      <Separator />
      <div>
        <h3 className="text-lg font-bold font-headline">Customize Slide</h3>
        <p className="text-sm text-muted-foreground">
          Edit the content and layout for the current slide.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`title-${slide.id}`}>Title</Label>
          <Input
            id={`title-${slide.id}`}
            value={slide.title}
            onChange={e => onUpdate(slide.id, { title: e.target.value })}
            className="text-lg font-semibold"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`content-${slide.id}`}>Content</Label>
          <Textarea
            id={`content-${slide.id}`}
            value={slide.content}
            onChange={e => onUpdate(slide.id, { content: e.target.value })}
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`prompt-${slide.id}`}>Image Suggestion</Label>
          <div className="flex gap-2">
            <Input
              id={`prompt-${slide.id}`}
              value={slide.imagePrompt}
              onChange={e =>
                onUpdate(slide.id, { imagePrompt: e.target.value })
              }
              placeholder="AI suggestion for the image..."
            />
            <Button
              variant="secondary"
              onClick={() => handleFetchImage(false)}
              disabled={isFetching || !slide.imagePrompt}
            >
              <ImageIcon className={isFetching ? 'animate-pulse' : ''} />
              <span className="sr-only">Fetch Image with API</span>
            </Button>
          </div>
           <Button
              variant="link"
              className="text-xs p-0 h-auto"
              onClick={() => handleFetchImage(true)}
              disabled={isFetching}
            >
              Use public fallback image
            </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-4 w-4 text-muted-foreground"/>
            <Label>Template</Label>
          </div>
          <TemplatePicker
            value={slide.layout}
            onChange={(templateId: TemplateId) =>
              onUpdate(slide.id, { layout: templateId })
            }
          />
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Full Carousel
      </Button>
    </div>
  );
}
