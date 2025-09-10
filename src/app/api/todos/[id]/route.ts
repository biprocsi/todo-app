// app/api/todos/[id]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const id = parseInt(params.id, 10);
	const { completed } = await req.json();

	try {
		const updatedTodo = await prisma.todo.update({
			where: { id },
			data: { completed },
		});
		return NextResponse.json(updatedTodo, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: `Failed to update todo with id ${id}` },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const id = params.id ? parseInt(params.id, 10) + "" : null;

	if (!id || isNaN(parseInt(id))) {
		return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
	}

	await prisma.todo.delete({ where: { id } });
	return NextResponse.json(null, { status: 200 });
}
