import { neon } from "@neondatabase/serverless";
import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { description } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Clasifica el problema de software en una TORRE (SOPORTE, CLIENTES, PRODUCTO) and a NIVEL DE CRITICIDAD (P0, P1, P2, P3).
              
              CRITERIOS DE TORRE:
              1. SOPORTE: Clientes existentes. Incidentes, errores, dudas técnicas.
              2. CLIENTES: Implementaciones nuevas (Go-Live). Cargas iniciales, parametrización.
              3. PRODUCTO: Nuevos features, cambios normativos, refactors.

              CRITERIOS DE CRITICIDAD:
              - P0: Bloqueo total (Nómina no calcula/timbra, IMSS no procesa, plataforma caída). Riesgo inmediato.
              - P1: Impacto alto. Error en cálculo o integración que bloquea go-live, pero hay operación parcial o workaround limitado.
              - P2: Impacto medio/bajo. Ajustes de parámetros, dudas técnicas, mejora menor de UX. No bloquea operación.
              - P3: Evolutivo/Roadmap. Nuevo feature, optimización, reporte complejo. Sin urgencia operativa.

              Responde ÚNICAMENTE en formato JSON con las llaves "torre" y "criticidad".
        `
      },
      { role: "user", content: `Clasifica: "${description}"` }
    ],
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  return res.status(200).json(result);
}