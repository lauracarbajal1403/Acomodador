import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("tasks.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    torre TEXT NOT NULL,
    criticidad TEXT NOT NULL,
    timestamp INTEGER NOT NULL
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/tasks", (req, res) => {
    try {
      const tasks = db.prepare("SELECT * FROM tasks ORDER BY timestamp DESC").all();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", (req, res) => {
    const { id, description, torre, criticidad, timestamp } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO tasks (id, description, torre, criticidad, timestamp) VALUES (?, ?, ?, ?, ?)");
      stmt.run(id, description, torre, criticidad, timestamp);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save task" });
    }
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { torre, criticidad } = req.body;
    try {
      if (torre && criticidad) {
        db.prepare("UPDATE tasks SET torre = ?, criticidad = ? WHERE id = ?").run(torre, criticidad, id);
      } else if (torre) {
        db.prepare("UPDATE tasks SET torre = ? WHERE id = ?").run(torre, id);
      } else if (criticidad) {
        db.prepare("UPDATE tasks SET criticidad = ? WHERE id = ?").run(criticidad, id);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
