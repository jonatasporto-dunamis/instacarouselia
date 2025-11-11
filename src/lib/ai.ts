import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Brand = { name?: string; tone?: string };
type GenArgs = { topic: string; brand?: Brand };
type GenOpts = { provider?: "openai" | "gemini"; apiKey?: string; model?: string };

type SlideContent = {
  title: string;
  bullets: string[];
  suggestion?: string;
};

export async function generateCarouselSlides(
  { topic, brand }: GenArgs,
  opts?: GenOpts
): Promise<SlideContent[]> {
  const provider =
    opts?.provider ??
    (process.env.OPENAI_API_KEY ? "openai" : (process.env.GEMINI_API_KEY ? "gemini" : undefined));

  // New, detailed system prompt
  const systemPrompt = `
Você é um especialista em marketing de conteúdo e copywriting para redes sociais. Sua missão é criar carrosséis para Instagram que geram alto engajamento (salvamentos, compartilhamentos, comentários).

Use português do Brasil natural e envolvente.

**Estrutura Obrigatória de 8 Slides:**

*   **Slide 1 (Gancho):** Crie um título MUITO forte e provocativo. Use curiosidade, contraste ou uma promessa. Ex: "O erro que 99% das pessoas cometem ao...". O objetivo é fazer o leitor deslizar.
*   **Slides 2-5 (Desenvolvimento):** Apresente o problema e a solução em micro-passos. Use frases curtas, listas, exemplos práticos e diretos. Cada slide deve ser fácil de ler e criar curiosidade para o próximo.
*   **Slides 6-7 (Aprofundamento e Conexão):** Entregue o "pulo do gato". Uma dica de ouro, um insight de especialista, ou um segredo de bastidor. Demonstre autoridade e empatia. Ex: "Testamos isso com +100 clientes e o resultado foi...".
*   **Slide 8 (Chamada para Ação - CTA):** Faça um convite claro e contextual. Peça para salvar, compartilhar ou seguir. Ex: "Salve este post para não esquecer" ou "Quer mais dicas assim? Siga meu perfil".

**Estilo de Escrita:**

*   **Linguagem Natural:** Converse com o leitor. Use voz ativa.
*   **Frases Curtas:** Cada "bullet" deve ser uma frase curta. Evite parágrafos.
*   **Inteligência Criativa:** Com base no tópico, infira a dor da persona e o tom ideal (educativo, inspirador, urgente).
*   **Storytelling:** Use analogias e pequenas histórias.
*   **Sem Repetição:** Varie a estrutura das frases.

**Formato de Saída:**

Responda **APENAS** com um objeto JSON válido, contendo uma chave "slides" com um array de 8 objetos. Cada objeto deve ter: { "title": "Título do Slide (curto)", "bullets": ["Frase 1.", "Frase 2."], "suggestion": "sugestão de imagem opcional" }.
`;

  const userPrompt = `Tópico do Carrossel: "${topic}"\nMarca: ${brand?.name ?? 'default'} | Tom Sugerido: ${brand?.tone ?? 'educativo e inspirador'}`;

  if (provider === "openai") {
    const apiKey = opts?.apiKey ?? process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY not found");
    const model = opts?.model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const openai = new OpenAI({ apiKey });

    const res = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const content = res.choices[0]?.message?.content ?? "{}";
    try {
        const parsed = JSON.parse(content);
        return parsed.slides || [];
    } catch (e) {
        console.error("Failed to parse JSON from OpenAI:", content);
        throw new Error("Received invalid JSON response from AI.");
    }
  }

  if (provider === "gemini") {
    const apiKey = opts?.apiKey ?? process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not found");
    const model = opts?.model ?? process.env.GEMINI_MODEL ?? "gemini-1.5-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const gen = genAI.getGenerativeModel({ model, generationConfig: { responseMimeType: "application/json" } });

    const fullPrompt = `${systemPrompt}\n\n**Tarefa:**\n${userPrompt}`;

    const out = await gen.generateContent(fullPrompt);
    const txt = out.response.text() || "{}";
    try {
        const parsed = JSON.parse(txt);
        return parsed.slides || [];
    } catch(e) {
        console.error("Failed to parse JSON from Gemini:", txt);
        throw new Error("Received invalid JSON response from AI.");
    }
  }

  throw new Error("No AI provider key found. Please configure it in Settings or via .env.local.");
}
