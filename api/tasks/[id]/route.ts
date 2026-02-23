import { NextResponse } from "next/server";

// ⚠️ misma referencia en memoria
import { tasks } from "../route";

// PATCH → actualizar tarea
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const index = tasks.findIndex(t => t.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    tasks[index] = {
      ...tasks[index],
      ...body,
    };

    return NextResponse.json(tasks[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating task" },
      { status: 500 }
    );
  }
}