'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { SlideCanvas } from './slide-canvas';
import type { Slide } from '@/lib/types';

type CarouselPreviewProps = {
  slides: Slide[];
  setApi: (api: CarouselApi) => void;
  currentSlideIndex: number;
};

export function CarouselPreview({
  slides,
  setApi,
  currentSlideIndex,
}: CarouselPreviewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map(slide => (
            <CarouselItem key={slide.id}>
              <div className="p-1">
                <SlideCanvas slide={slide} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {currentSlideIndex + 1} of {slides.length}
      </div>
    </div>
  );
}
