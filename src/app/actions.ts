
'use server';

import { generateCarouselSlides } from '@/ai/flows/generate-carousel-slides';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Slide } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';

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

export async function saveApiKeysAction(
  apiKeys: Record<string, string>
): Promise<{ success?: boolean; error?: string }> {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw e;
      }
    }

    const envMap = new Map<string, string>();
    envContent.split('\n').forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...value] = line.split('=');
        if (key) {
          envMap.set(key.trim(), value.join('=').trim());
        }
      }
    });

    if (apiKeys.geminiApiKey) {
      envMap.set('GEMINI_API_KEY', apiKeys.geminiApiKey);
    }
    if (apiKeys.gptApiKey) {
      envMap.set('OPENAI_API_KEY', apiKeys.gptApiKey);
    }
    // Add other keys as needed

    const newEnvContent = Array.from(envMap.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    await fs.writeFile(envPath, newEnvContent);

    // This is important for Next.js to pick up the new env vars in development
    // In production, a server restart is typically required.
    revalidatePath('/'); 

    return { success: true };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'Failed to save API keys.';
    return { error: errorMessage };
  }
}
