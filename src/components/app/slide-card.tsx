// This file is DEPRECATED and will be removed.
// The logic has been moved to /src/lib/templates/registry.tsx and /src/components/app/slide-canvas.tsx
// This is to support the new template system.

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Slide } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { TemplateId } from '@/lib/templates/types';

// This is a simplified version for compatibility, the real logic is in the template registry.
const layoutClasses: Record<TemplateId, string> = {
  'classic': 'flex-col',
  'image-top': 'flex-col',
  'image-bottom': 'flex-col-reverse',
  'image-left': 'flex-col md:flex-row',
  'image-right': 'flex-col md:flex-row-reverse',
  'text-only': 'flex-col',
  'full-bleed': 'relative',
  'minimal': 'flex-col',
  'headline': 'flex-col',
};

export function SlideCard({ slide }: { slide: Slide }) {
  const layout = slide.layout || 'classic';
  return (
    <Card className="aspect-square w-full overflow-hidden shadow-xl">
      <CardContent
        className={cn(
          'flex h-full w-full p-0',
          layoutClasses[layout]
        )}
      >
        <div
          className={cn(
            'relative shrink-0',
            layout === 'text-only' || layout === 'minimal' || layout === 'headline' ? 'hidden' : 'w-full h-1/2'
          )}
        >
          {slide.imageUrl && (
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
            'flex flex-col justify-center items-center p-8 text-center shrink-0 grow'
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
