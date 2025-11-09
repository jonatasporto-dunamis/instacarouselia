import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

type SlideCardProps = {
  slide: Slide;
};

const layoutClasses = {
  'image-top': 'flex-col',
  'image-bottom': 'flex-col-reverse',
  'image-left': 'flex-col md:flex-row',
  'image-right': 'flex-col md:flex-row-reverse',
  'text-only': 'flex-col',
};

const imageContainerClasses = {
  'image-top': 'w-full h-1/2',
  'image-bottom': 'w-full h-1/2',
  'image-left': 'w-full h-1/2 md:w-1/2 md:h-full',
  'image-right': 'w-full h-1/2 md:w-1/2 md:h-full',
  'text-only': 'hidden',
};

const textContainerClasses = {
  'image-top': 'w-full h-1/2',
  'image-bottom': 'w-full h-1/2',
  'image-left': 'w-full h-1/2 md:w-1/2 md:h-full',
  'image-right': 'w-full h-1/2 md:w-1/2 md:h-full',
  'text-only': 'w-full h-full',
};


export function SlideCard({ slide }: SlideCardProps) {
  return (
    <Card className="aspect-square w-full overflow-hidden shadow-xl">
      <CardContent
        className={cn(
          'flex h-full w-full p-0',
          layoutClasses[slide.layout]
        )}
      >
        <div
          className={cn(
            'relative shrink-0',
            imageContainerClasses[slide.layout]
          )}
        >
          {slide.imageUrl && slide.layout !== 'text-only' && (
            <Image
              src={slide.imageUrl}
              alt={slide.imagePrompt || slide.title}
              fill
              className="object-cover"
              data-ai-hint={slide.imageHint}
            />
          )}
        </div>
        <div
          className={cn(
            'flex flex-col justify-center items-center p-8 text-center shrink-0 grow',
            textContainerClasses[slide.layout]
          )}
        >
          <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {slide.title}
          </h3>
          <p className="text-base lg:text-lg text-foreground/80">
            {slide.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
