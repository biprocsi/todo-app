// app/api/todos/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/todos - Fetch all todos
export async function GET() {
	try {
		const todos = await prisma.todo.findMany();
		return NextResponse.json(todos, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch todos" },
			{ status: 500 },
		);
	}
}

// POST /api/todos - Create a new todo
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { title } = body;

		const newTodo = await prisma.todo.create({
			data: { title },
		});

		return NextResponse.json(newTodo, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create todo" },
			{ status: 500 },
		);
	}
}
