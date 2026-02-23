import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query as { id: string };

  if (req.method === "PATCH") {
    const { torre, criticidad } = req.body;
    try {
      if (torre && criticidad) {
        await sql`UPDATE tasks SET torre = ${torre}, criticidad = ${criticidad} WHERE id = ${id}`;
      } else if (torre) {
        await sql`UPDATE tasks SET torre = ${torre} WHERE id = ${id}`;
      } else if (criticidad) {
        await sql`UPDATE tasks SET criticidad = ${criticidad} WHERE id = ${id}`;
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update task" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await sql`DELETE FROM tasks WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete task" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}