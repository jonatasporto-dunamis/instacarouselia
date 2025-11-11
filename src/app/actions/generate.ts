"use server";
import { generateCarouselSlides } from "@/lib/ai";

export async function generateSlidesAction(input: {
  topic: string;
  brand?: { name?: string; tone?: string };
  provider?: "openai" | "gemini";
  apiKey?: string;
  model?: string;
}) {
  if (!input?.topic?.trim()) throw new Error("Informe um tópico.");
  const slides = await generateCarouselSlides(
    { topic: input.topic, brand: input.brand },
    { provider: input.provider, apiKey: input.apiKey, model: input.model }
  );
  return slides;
}
