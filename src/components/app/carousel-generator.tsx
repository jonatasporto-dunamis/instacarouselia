'use client';

import { useState, useEffect, useTransition } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import { useToast } from '@/hooks/use-toast';
import type { Slide } from '@/lib/types';
import { generateSlidesAction } from '@/app/actions';

import { TopicForm } from './topic-form';
import { SlideEditor } from './slide-editor';
import { CarouselPreview } from './carousel-preview';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react';

export function CarouselGenerator() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

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

  const handleGenerateSlides = (topic: string) => {
    startTransition(async () => {
      const result = await generateSlidesAction(topic);
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
        <CardContent className="p-6">
          <TopicForm
            onGenerate={handleGenerateSlides}
            isGenerating={isPending}
          />
          {slides.length > 0 && currentSlide && (
            <SlideEditor
              key={currentSlide.id}
              slide={currentSlide}
              onUpdate={updateSlide}
            />
          )}
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
