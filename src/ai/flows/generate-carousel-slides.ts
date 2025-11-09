'use server';

/**
 * @fileOverview Generates carousel slides for Instagram based on a given topic.
 *
 * - generateCarouselSlides - A function that generates carousel slides.
 * - GenerateCarouselSlidesInput - The input type for the generateCarouselSlides function.
 * - GenerateCarouselSlidesOutput - The return type for the generateCarouselSlides function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCarouselSlidesInputSchema = z.object({
  topic: z.string().describe('The topic for the Instagram carousel.'),
  numSlides: z.number().default(5).describe('The number of slides to generate (default: 5).'),
});
export type GenerateCarouselSlidesInput = z.infer<
  typeof GenerateCarouselSlidesInputSchema
>;

const CarouselSlideSchema = z.object({
  title: z.string().describe('The title of the slide.'),
  content: z.string().describe('The content of the slide.'),
  imagePrompt: z
    .string()
    .optional()
    .describe('A prompt for generating an image for the slide.'),
});

const GenerateCarouselSlidesOutputSchema = z.object({
  slides: z.array(CarouselSlideSchema).describe('The generated carousel slides.'),
});
export type GenerateCarouselSlidesOutput = z.infer<
  typeof GenerateCarouselSlidesOutputSchema
>;

export async function generateCarouselSlides(
  input: GenerateCarouselSlidesInput
): Promise<GenerateCarouselSlidesOutput> {
  return generateCarouselSlidesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCarouselSlidesPrompt',
  input: {schema: GenerateCarouselSlidesInputSchema},
  output: {schema: GenerateCarouselSlidesOutputSchema},
  prompt: `You are an AI assistant designed to generate engaging Instagram carousel slides.

  Based on the topic: "{{topic}}", create {{numSlides}} visually appealing and informative slides.

  Each slide should have a title, content, and an optional image prompt to generate relevant images for each slide. Think about a good image prompt that could be used to generate an image that illustrates each slide. Specify the image prompt in the imagePrompt field. If no image is needed, leave the field empty.

  Return the slides in JSON format. Each slide object in the "slides" array should have "title", "content", and "imagePrompt" keys.
`,
});

const generateCarouselSlidesFlow = ai.defineFlow(
  {
    name: 'generateCarouselSlidesFlow',
    inputSchema: GenerateCarouselSlidesInputSchema,
    outputSchema: GenerateCarouselSlidesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
