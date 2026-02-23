import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const tasks = await sql`SELECT * FROM tasks ORDER BY timestamp DESC`;
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  if (req.method === "POST") {
    const { id, description, torre, criticidad, timestamp } = req.body;
    try {
      await sql`
        INSERT INTO tasks (id, description, torre, criticidad, timestamp)
        VALUES (${id}, ${description}, ${torre}, ${criticidad}, ${timestamp})
      `;
      return res.status(201).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to save task" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}