'use server';

/**
 * @fileOverview A flow that improves the content of a slide using AI to enhance engagement.
 *
 * - improveSlideContentWithAI - A function that improves the content of a slide.
 * - ImproveSlideContentWithAIInput - The input type for the improveSlideContentWithAI function.
 * - ImproveSlideContentWithAIOutput - The return type for the improveSlideContentWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveSlideContentWithAIInputSchema = z.object({
  topic: z.string().describe('The main topic of the carousel.'),
  slideContent: z.string().describe('The current content of the slide.'),
});

export type ImproveSlideContentWithAIInput = z.infer<
  typeof ImproveSlideContentWithAIInputSchema
>;

const ImproveSlideContentWithAIOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved text content for the slide, optimized for engagement.'),
});

export type ImproveSlideContentWithAIOutput = z.infer<
  typeof ImproveSlideContentWithAIOutputSchema
>;

export async function improveSlideContentWithAI(
  input: ImproveSlideContentWithAIInput
): Promise<ImproveSlideContentWithAIOutput> {
  return improveSlideContentWithAIFlow(input);
}

const improveSlideContentPrompt = ai.definePrompt({
  name: 'improveSlideContentPrompt',
  input: {schema: ImproveSlideContentWithAIInputSchema},
  output: {schema: ImproveSlideContentWithAIOutputSchema},
  prompt: `You are an AI assistant tasked with enhancing Instagram carousel slides for maximum engagement.\n\n  Given the topic of the carousel and the current content of a slide, your goal is to rewrite the slide content to be more engaging, attention-grabbing, and shareable.\n\n  Topic: {{{topic}}}\n  Current Slide Content: {{{slideContent}}}\n\n  Improved Slide Content: `,
});

const improveSlideContentWithAIFlow = ai.defineFlow(
  {
    name: 'improveSlideContentWithAIFlow',
    inputSchema: ImproveSlideContentWithAIInputSchema,
    outputSchema: ImproveSlideContentWithAIOutputSchema,
  },
  async input => {
    const {output} = await improveSlideContentPrompt(input);
    return output!;
  }
);
