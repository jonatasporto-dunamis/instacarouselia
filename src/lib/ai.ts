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
    if (!apiKey) throw new Error("OPENAI_API_KEY ausente");
    const model = opts?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const openai = new OpenAI({ apiKey });

    const sys =
      "Você cria carrosséis para Instagram. Gere 7–10 slides curtos com títulos fortes e bullets. Responda SOMENTE JSON: [{title, bullets[], suggestion}].";
    const prompt =
      `Tema: ${topic}\nMarca: ${brand?.name ?? "padrão"} | Tom: ${brand?.tone ?? "inspirador"}\nSomente JSON válido.`;

    const res = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = res.choices[0]?.message?.content ?? "[]";
    // OpenAI pode retornar um objeto JSON stringificado com a chave `slides`
    try {
        const parsed = JSON.parse(content);
        return parsed.slides || parsed;
    } catch (e) {
        console.error("Falha ao analisar JSON da OpenAI:", content);
        return [];
    }
  }

  if (provider === "gemini") {
    const apiKey = opts?.apiKey ?? process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY ausente");
    const model = opts?.model ?? process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const gen = genAI.getGenerativeModel({ model, generationConfig: { responseMimeType: "application/json" } });

    const sys =
      "Você cria carrosséis para Instagram. Gere 7–10 slides curtos com títulos fortes e bullets. Responda SOMENTE JSON no formato { slides: [{title, bullets[], suggestion}] }.";
    const prompt =
      `Tema: ${topic}\nMarca: ${brand?.name ?? "padrão"} | Tom: ${brand?.tone ?? "inspirador"}\nSomente JSON válido.`;

    const out = await gen.generateContent(prompt);
    const txt = out.response.text() || "{}";
    try {
        const parsed = JSON.parse(txt);
        return parsed.slides || [];
    } catch(e) {
        console.error("Falha ao analisar JSON do Gemini:", txt);
        return [];
    }
  }

  throw new Error("Nenhuma chave de IA encontrada. Configure em .env.local ou use Settings.");
}
