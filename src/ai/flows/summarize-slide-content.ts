'use server';

/**
 * @fileOverview A flow that summarizes the text content of a slide for Instagram carousels.
 *
 * - summarizeSlideContent - A function that summarizes the content of a slide.
 * - SummarizeSlideContentInput - The input type for the summarizeSlideContent function.
 * - SummarizeSlideContentOutput - The return type for the summarizeSlideContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSlideContentInputSchema = z.object({
  topic: z.string().describe('The main topic of the carousel.'),
  slideContent: z.string().describe('The detailed text content of the slide to summarize.'),
});

export type SummarizeSlideContentInput = z.infer<typeof SummarizeSlideContentInputSchema>;

const SummarizeSlideContentOutputSchema = z.object({
  summary: z.string().describe('The summarized and engaging text content for the slide.'),
});

export type SummarizeSlideContentOutput = z.infer<typeof SummarizeSlideContentOutputSchema>;

export async function summarizeSlideContent(input: SummarizeSlideContentInput): Promise<SummarizeSlideContentOutput> {
  return summarizeSlideContentFlow(input);
}

const summarizeSlideContentPrompt = ai.definePrompt({
  name: 'summarizeSlideContentPrompt',
  input: {schema: SummarizeSlideContentInputSchema},
  output: {schema: SummarizeSlideContentOutputSchema},
  prompt: `You are an AI assistant helping to create engaging Instagram carousels.

  Your task is to summarize the given slide content based on the overall topic of the carousel.
  The summarized content should be concise, attention-grabbing, and suitable for an Instagram audience.

  Topic: {{{topic}}}
  Slide Content: {{{slideContent}}}

  Summary:`,
});

const summarizeSlideContentFlow = ai.defineFlow(
  {
    name: 'summarizeSlideContentFlow',
    inputSchema: SummarizeSlideContentInputSchema,
    outputSchema: SummarizeSlideContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeSlideContentPrompt(input);
    return output!;
  }
);
