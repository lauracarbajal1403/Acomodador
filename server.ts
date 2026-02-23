import express from "express";
import { createServer as createViteServer } from "vite";
import { neon } from "@neondatabase/serverless";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = neon(process.env.DATABASE_URL!);

// Initialize database
await sql`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    torre TEXT NOT NULL,
    criticidad TEXT NOT NULL,
    timestamp BIGINT NOT NULL
  )
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await sql`SELECT * FROM tasks ORDER BY timestamp DESC`;
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", async (req, res) => {
    const { id, description, torre, criticidad, timestamp } = req.body;
    try {
      await sql`
        INSERT INTO tasks (id, description, torre, criticidad, timestamp)
        VALUES (${id}, ${description}, ${torre}, ${criticidad}, ${timestamp})
      `;
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save task" });
    }
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { torre, criticidad } = req.body;
    try {
      if (torre && criticidad) {
        await sql`UPDATE tasks SET torre = ${torre}, criticidad = ${criticidad} WHERE id = ${id}`;
      } else if (torre) {
        await sql`UPDATE tasks SET torre = ${torre} WHERE id = ${id}`;
      } else if (criticidad) {
        await sql`UPDATE tasks SET criticidad = ${criticidad} WHERE id = ${id}`;
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await sql`DELETE FROM tasks WHERE id = ${id}`;
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // Vite for local dev only
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();