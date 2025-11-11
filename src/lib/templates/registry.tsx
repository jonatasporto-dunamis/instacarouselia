
import type { TemplateDef, TemplateId, SlideData } from './types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const templates: TemplateDef[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Image on top, text below. Balanced and clean.',
    render: ({ data }: { data: SlideData }) => (
      <div className="flex flex-col h-full w-full bg-card">
        <div className="relative w-full h-1/2">
          {data.imageUrl && (
            <Image src={data.imageUrl} alt={data.imageHint || data.title} fill className="object-cover" />
          )}
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12 text-center h-1/2">
          <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{data.title}</h3>
          <p className="text-base lg:text-lg text-foreground/80 whitespace-pre-wrap">{data.content}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'image-top',
    name: 'Hero Top',
    description: 'A larger hero image for more visual impact.',
    render: ({ data }: { data: SlideData }) => (
       <div className="flex flex-col h-full w-full bg-card">
        <div className="relative w-full h-3/5">
          {data.imageUrl && (
            <Image src={data.imageUrl} alt={data.imageHint || data.title} fill className="object-cover" />
          )}
        </div>
        <div className="flex flex-col justify-center p-8 text-center h-2/5">
          <h3 className="font-headline text-xl md:text-2xl font-bold mb-2">{data.title}</h3>
          <p className="text-sm md:text-base text-foreground/80 whitespace-pre-wrap">{data.content}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'image-right',
    name: 'Split Right',
    description: 'Side-by-side layout with image on the right.',
    render: ({ data }: { data: SlideData }) => (
      <div className="flex h-full w-full bg-card">
        <div className="flex flex-col justify-center p-8 lg:p-12 text-left w-1/2">
          <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">{data.title}</h3>
          <p className="text-base text-foreground/80 whitespace-pre-wrap">{data.content}</p>
        </div>
        <div className="relative w-1/2 h-full">
          {data.imageUrl && (
            <Image src={data.imageUrl} alt={data.imageHint || data.title} fill className="object-cover" />
          )}
        </div>
      </div>
    ),
  },
  {
    id: 'full-bleed',
    name: 'Full Bleed',
    description: 'Text overlaid on a full-screen background image.',
    render: ({ data }: { data: SlideData }) => (
      <div className="relative h-full w-full">
        {data.imageUrl && (
          <Image src={data.imageUrl} alt={data.imageHint || data.title} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-8 lg:p-12 text-white">
           <h3 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{data.title}</h3>
           <p className="text-lg lg:text-xl text-white/90 whitespace-pre-wrap drop-shadow-md">{data.content}</p>
        </div>
      </div>
    ),
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Text-only, clean and simple for quotes or statements.',
     render: ({ data }: { data: SlideData }) => (
      <div className="flex flex-col justify-center items-center h-full w-full p-8 lg:p-16 text-center bg-card">
        <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4">{data.title}</h3>
        <p className="text-lg lg:text-xl text-foreground/80 whitespace-pre-wrap">{data.content}</p>
      </div>
    ),
  },
  {
    id: 'headline',
    name: 'Headline',
    description: 'A bold, brand-focused headline for opening slides.',
    render: ({ data }: { data: SlideData }) => (
      <div className="flex flex-col justify-center items-center h-full w-full p-8 lg:p-16 text-center bg-dg-gradient text-white">
        <h3 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">{data.title}</h3>
         {data.content && <p className="mt-4 text-lg lg:text-xl text-white/90 whitespace-pre-wrap">{data.content}</p>}
      </div>
    ),
  },
];

const templateMap = new Map<TemplateId, TemplateDef>(
  templates.map(t => [t.id, t])
);

export function getTemplate(id: TemplateId): TemplateDef | undefined {
  return templateMap.get(id);
}

export function getAllTemplates(): TemplateDef[] {
  return templates;
}
