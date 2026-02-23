import { NextResponse } from "next/server";

// ✅ EXPORTADO
export let tasks: any[] = [];

// GET → obtener tareas
export async function GET() {
  return NextResponse.json(tasks);
}

// POST → crear tarea
export async function POST(req: Request) {
  try {
    const body = await req.json();
    tasks.unshift(body);
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error saving task" },
      { status: 500 }
    );
  }
}