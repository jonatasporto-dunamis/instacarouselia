
'use server';

import { generateCarouselSlides } from '@/lib/ai';
import type { Slide } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { getSmartFallbackImage } from '@/lib/imageFallback';

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
          'Failed to generate slides. The AI did not return valid content.',
      };
    }

    const slides: Slide[] = await Promise.all(
      generatedContent.map(async (item, index) => {
        const fallback = await getSmartFallbackImage({
          query: item.suggestion || item.title || 'marketing',
        });

        return {
          id: crypto.randomUUID(),
          title: item.title,
          content: Array.isArray(item.bullets) ? item.bullets.join('\n') : '',
          imagePrompt: item.suggestion,
          imageUrl: fallback.imageUrl,
          imageHint: item.suggestion || item.title,
          imageProvider: fallback.provider,
          layout: item.suggestion ? 'classic' : 'minimal', // Use 'classic' and 'minimal' as default layouts
        };
      })
    );

    revalidatePath('/');
    return { slides };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      error: `An unexpected error occurred: ${errorMessage}. Please check your API key in Settings or .env.local.`,
    };
  }
}
