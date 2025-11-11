import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Brand = { name?: string; tone?: string };
type GenArgs = { topic: string; brand?: Brand };
type GenOpts = { provider?: "openai" | "gemini"; apiKey?: string; model?: string };

export async function generateCarouselSlides(
  { topic, brand }: GenArgs,
  opts?: GenOpts
) {
  const provider =
    opts?.provider ??
    (process.env.OPENAI_API_KEY ? "openai" : (process.env.GEMINI_API_KEY ? "gemini" : undefined));

  if (provider === "openai") {
    const apiKey = opts?.apiKey ?? process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY not found");
    const model = opts?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const openai = new OpenAI({ apiKey });

    const sys =
      "You create carousels for Instagram. Generate 7–10 short slides with strong titles and bullets. Respond ONLY with JSON: { \"slides\": [{title, bullets[], suggestion}] }.";
    const prompt =
      `Topic: ${topic}\nBrand: ${brand?.name ?? "default"} | Tone: ${brand?.tone ?? "inspirational"}\nOnly valid JSON.`;

    const res = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = res.choices[0]?.message?.content ?? "{}";
    try {
        const parsed = JSON.parse(content);
        return parsed.slides || [];
    } catch (e) {
        console.error("Failed to parse JSON from OpenAI:", content);
        return [];
    }
  }

  if (provider === "gemini") {
    const apiKey = opts?.apiKey ?? process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not found");
    const model = opts?.model ?? process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const gen = genAI.getGenerativeModel({ model, generationConfig: { responseMimeType: "application/json" } });

    const sys =
      "You create carousels for Instagram. Generate 7–10 short slides with strong titles and bullets. Respond ONLY with JSON in the format { \"slides\": [{title, bullets[], suggestion}] }.";
    const prompt =
      `Topic: ${topic}\nBrand: ${brand?.name ?? "default"} | Tone: ${brand?.tone ?? "inspirational"}\nOnly valid JSON.`;

    const out = await gen.generateContent(`${sys}\n${prompt}`);
    const txt = out.response.text() || "{}";
    try {
        const parsed = JSON.parse(txt);
        return parsed.slides || [];
    } catch(e) {
        console.error("Failed to parse JSON from Gemini:", txt);
        return [];
    }
  }

  throw new Error("No AI key found. Configure it in Settings or .env.local.");
}
