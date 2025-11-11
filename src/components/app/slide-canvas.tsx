
'use client';

import { getTemplate } from '@/lib/templates/registry';
import type { Slide } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import type { SlideFormat } from './carousel-generator';
import { cn } from '@/lib/utils';

type SlideCanvasProps = {
  slide: Slide;
  format: SlideFormat;
};

const formatClasses: Record<SlideFormat, string> = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    story: 'aspect-[9/16]',
}

export function SlideCanvas({ slide, format = 'portrait' }: SlideCanvasProps) {
  const templateId = slide.layout || 'classic';
  const template = getTemplate(templateId);

  if (!template) {
    return (
      <div className="aspect-[4/5] w-full flex items-center justify-center bg-destructive text-destructive-foreground">
        <p>Error: Template "{templateId}" not found.</p>
      </div>
    );
  }

  return (
    <div className={cn(
        "relative w-full bg-muted/50 overflow-hidden rounded-lg shadow-xl border",
        formatClasses[format]
    )}>
      {template.render({ data: slide })}
      {slide.imageProvider && slide.imageProvider !== 'none' && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute bottom-2 right-2 p-1.5 bg-black/50 text-white/80 rounded-full cursor-pointer">
                <Info className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Image from: <span className="capitalize">{slide.imageProvider}</span></p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
