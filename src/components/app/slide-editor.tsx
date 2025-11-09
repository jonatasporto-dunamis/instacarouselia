'use client';

import {
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  Download,
  CaseSensitive,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import type { Slide, Layout } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SlideEditorProps = {
  slide: Slide;
  onUpdate: (id: string, updatedProps: Partial<Slide>) => void;
};

const layoutOptions: { value: Layout; label: string; icon: React.ElementType }[] = [
  { value: 'image-top', label: 'Image Top', icon: ArrowUpToLine },
  { value: 'image-bottom', label: 'Image Bottom', icon: ArrowDownToLine },
  { value: 'image-left', label: 'Image Left', icon: ArrowLeftToLine },
  { value: 'image-right', label: 'Image Right', icon: ArrowRightToLine },
  { value: 'text-only', label: 'Text Only', icon: CaseSensitive },
];

export function SlideEditor({ slide, onUpdate }: SlideEditorProps) {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: 'Exporting Carousel',
      description: 'Your carousel is being prepared for download.',
    });
    // In a real app, this would trigger a download.
    console.log('Exporting carousel...');
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

        <div className="space-y-3">
          <Label>Layout</Label>
          <TooltipProvider>
            <RadioGroup
              defaultValue={slide.layout}
              onValueChange={(value: Layout) => onUpdate(slide.id, { layout: value })}
              className="grid grid-cols-5 gap-2"
            >
              {layoutOptions.map(option => (
                 <Tooltip key={option.value}>
                  <TooltipTrigger asChild>
                    <RadioGroupItem
                      value={option.value}
                      id={`layout-${slide.id}-${option.value}`}
                      className="sr-only"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{option.label}</p>
                  </TooltipContent>
                   <Label
                    htmlFor={`layout-${slide.id}-${option.value}`}
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                  >
                    <option.icon className="h-5 w-5" />
                  </Label>
                </Tooltip>
              ))}
            </RadioGroup>
          </TooltipProvider>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export Full Carousel
      </Button>
    </div>
  );
}
