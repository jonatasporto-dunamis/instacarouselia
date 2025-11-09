'use server';

/**
 * @fileOverview Generates carousel slides for Instagram based on a given topic.
 *
 * - generateAiCarouselSlides - A function that generates carousel slides.
 * - GenerateAiCarouselSlidesInput - The input type for the generateAiCarouselSlides function.
 * - GenerateAiCarouselSlidesOutput - The return type for the generateAiCarouselSlides function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiCarouselSlidesInputSchema = z.object({
  topic: z.string().describe('The topic for the Instagram carousel.'),
  numSlides: z.number().default(5).describe('The number of slides to generate (default: 5).'),
});
export type GenerateAiCarouselSlidesInput = z.infer<
  typeof GenerateAiCarouselSlidesInputSchema
>;

const CarouselSlideSchema = z.object({
  title: z.string().describe('The title of the slide.'),
  content: z.string().describe('The content of the slide.'),
  imagePrompt: z
    .string()
    .optional()
    .describe('A prompt for generating an image for the slide.'),
});

const GenerateAiCarouselSlidesOutputSchema = z.object({
  slides: z.array(CarouselSlideSchema).describe('The generated carousel slides.'),
});
export type GenerateAiCarouselSlidesOutput = z.infer<
  typeof GenerateAiCarouselSlidesOutputSchema
>;

export async function generateAiCarouselSlides(
  input: GenerateAiCarouselSlidesInput
): Promise<GenerateAiCarouselSlidesOutput> {
  return generateAiCarouselSlidesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiCarouselSlidesPrompt',
  input: {schema: GenerateAiCarouselSlidesInputSchema},
  output: {schema: GenerateAiCarouselSlidesOutputSchema},
  prompt: `You are an AI assistant designed to generate engaging Instagram carousel slides.\n
  Based on the topic: "{{topic}}", create {{numSlides}} visually appealing and informative slides.\n
  Each slide should have a title, content, and an optional image prompt to generate relevant images for each slide. Think about a good image prompt that could be used to generate an image that illustrates each slide. Specify the image prompt in the imagePrompt field. If no image is needed, leave the field empty.\n
  Return the slides in JSON format. Each slide object in the "slides" array should have "title", "content", and "imagePrompt" keys.\n`,
});

const generateAiCarouselSlidesFlow = ai.defineFlow(
  {
    name: 'generateAiCarouselSlidesFlow',
    inputSchema: GenerateAiCarouselSlidesInputSchema,
    outputSchema: GenerateAiCarouselSlidesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
