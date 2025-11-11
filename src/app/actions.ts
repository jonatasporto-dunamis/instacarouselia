
'use server';

import { generateCarouselSlides } from '@/lib/ai';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Slide } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function generateSlidesAction(input: {
  topic: string;
  brand?: { name?: string; tone?: string };
  provider?: 'openai' | 'gemini';
  apiKey?: string;
  model?: string;
}): Promise<{ slides?: Slide[]; error?: string }> {
  if (!input.topic?.trim()) {
    return { error: 'Topic cannot be empty.' };
  }

  try {
    const generatedContent = await generateCarouselSlides(
      { topic: input.topic, brand: input.brand },
      { provider: input.provider, apiKey: input.apiKey, model: input.model }
    );

    if (!generatedContent || generatedContent.length === 0) {
      return {
        error:
          'Failed to generate slides. The AI did not return a valid response.',
      };
    }

    const slides: Slide[] = generatedContent.map((item, index) => {
      const placeholder = PlaceHolderImages[index % PlaceHolderImages.length];
      return {
        id: crypto.randomUUID(),
        title: item.title,
        content: Array.isArray(item.bullets) ? item.bullets.join('\n') : '',
        imagePrompt: item.suggestion,
        imageUrl: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
        layout: item.suggestion ? 'image-top' : 'text-only',
      };
    });

    revalidatePath('/');
    return { slides };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      error: `An unexpected error occurred: ${errorMessage}. Configure the key in Settings or .env.local.`,
    };
  }
}
