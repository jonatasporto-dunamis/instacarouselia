
'use server';

import { generateCarouselSlides } from '@/ai/flows/generate-carousel-slides';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Slide } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function generateSlidesAction(
  topic: string
): Promise<{ slides?: Slide[]; error?: string }> {
  if (!topic) {
    return { error: 'Topic cannot be empty.' };
  }

  try {
    const result = await generateCarouselSlides({ topic, numSlides: 5 });

    if (!result || !result.slides) {
      return { error: 'Failed to generate slides. The AI did not return a valid response.' };
    }

    const slides: Slide[] = result.slides.map((slide, index) => {
      const placeholder = PlaceHolderImages[index % PlaceHolderImages.length];
      return {
        id: crypto.randomUUID(),
        title: slide.title,
        content: slide.content,
        imagePrompt: slide.imagePrompt,
        imageUrl: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
        layout: slide.imagePrompt ? 'image-top' : 'text-only',
      };
    });

    revalidatePath('/');
    return { slides };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `An unexpected error occurred: ${errorMessage}` };
  }
}
