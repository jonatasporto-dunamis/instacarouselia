
'use client';

import { useState, useEffect, useTransition } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import type { Slide } from '@/lib/types';
import { generateSlidesAction } from '@/app/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TopicForm } from './topic-form';
import { SlideEditor } from './slide-editor';
import { CarouselPreview } from './carousel-preview';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Square, RectangleVertical, Smartphone } from 'lucide-react';
import { BrandIdentityForm } from './brand-identity-form';
import { ApiSettingsForm } from './api-settings-form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';

export type SlideFormat = 'square' | 'portrait' | 'story';

export function CarouselGenerator() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [format, setFormat] = useState<SlideFormat>('portrait');

  useEffect(() => {
    const savedFormat = localStorage.getItem('slide.format') as SlideFormat | null;
    if (savedFormat) {
      setFormat(savedFormat);
    }
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrentSlideIndex(api.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleSetFormat = (newFormat: SlideFormat) => {
    if (newFormat) {
        setFormat(newFormat);
        localStorage.setItem('slide.format', newFormat);
    }
  }

  const handleGenerateSlides = (topic: string) => {
    startTransition(async () => {
      const provider = localStorage.getItem('ai.provider') as
        | 'openai'
        | 'gemini'
        | null;
      const apiKey = localStorage.getItem('ai.key') || undefined;
      const model = localStorage.getItem('ai.model') || undefined;

      const result = await generateSlidesAction({
        topic,
        provider: provider || undefined,
        apiKey,
        model,
      });

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: result.error,
        });
      } else if (result.slides) {
        setSlides(result.slides);
        setCurrentSlideIndex(0);
        api?.scrollTo(0);
        toast({
          title: 'Success!',
          description: 'Your new carousel is ready for customization.',
        });
      }
    });
  };

  const updateSlide = (id: string, updatedProps: Partial<Slide>) => {
    setSlides(prevSlides =>
      prevSlides.map(slide =>
        slide.id === id ? { ...slide, ...updatedProps } : slide
      )
    );
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-1 shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-t-lg rounded-b-none">
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="brand">Brand</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="generator" className="p-6">
              <div className="space-y-6">
                <TopicForm
                  onGenerate={handleGenerateSlides}
                  isGenerating={isPending}
                />
                <div className="space-y-3">
                  <Label>Format</Label>
                   <ToggleGroup type="single" value={format} onValueChange={handleSetFormat} className="grid grid-cols-3">
                        <ToggleGroupItem value="square" aria-label="Square format">
                            <Square className="h-4 w-4 mr-2"/>
                            Square
                        </ToggleGroupItem>
                        <ToggleGroupItem value="portrait" aria-label="Portrait format">
                            <RectangleVertical className="h-4 w-4 mr-2"/>
                            Portrait
                        </ToggleGroupItem>
                        <ToggleGroupItem value="story" aria-label="Story format">
                            <Smartphone className="h-4 w-4 mr-2"/>
                            Story
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
              </div>
              {slides.length > 0 && currentSlide && (
                <SlideEditor
                  key={currentSlide.id}
                  slide={currentSlide}
                  onUpdate={updateSlide}
                />
              )}
            </TabsContent>
            <TabsContent value="brand" className="p-6">
              <BrandIdentityForm />
            </TabsContent>
            <TabsContent value="settings" className="p-6">
              <ApiSettingsForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        {isPending ? (
          <div className="aspect-square w-full max-w-2xl mx-auto flex items-center justify-center">
            <div className="w-full h-full p-4">
              <Skeleton className="w-full h-full rounded-lg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground">
                  <Lightbulb className="w-12 h-12 mb-4 animate-pulse text-primary" />
                  <p className="font-semibold text-lg font-headline">Generating your carousel...</p>
                  <p className="text-sm text-muted-foreground">The AI is crafting your content. Please wait.</p>
              </div>
            </div>
          </div>
        ) : slides.length > 0 ? (
          <CarouselPreview
            slides={slides}
            setApi={setApi}
            currentSlideIndex={currentSlideIndex}
            format={format}
          />
        ) : (
          <Card className="aspect-square w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center shadow-lg bg-card/80 border-dashed">
            <CardContent className="p-6">
              <div className="p-4 rounded-full bg-primary/10 mb-4 inline-block">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold font-headline mb-2">Your Carousel Awaits</h2>
              <p className="text-muted-foreground">
                Enter a topic on the left to generate your AI-powered Instagram carousel.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
