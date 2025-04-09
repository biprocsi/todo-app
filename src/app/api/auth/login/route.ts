// app/api/auth/me/route.ts
import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "supersecretkey";

export async function GET(req: NextRequest) {
	const authHeader = req.headers.get("Authorization");

	const token = authHeader || "";

	if (!token) {
		return NextResponse.json({ error: "No token provided" }, { status: 401 });
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY);

		return NextResponse.json({ user: decoded }, { status: 200 });
	} catch (error) {
		console.error("Authentication error:", error);
		return NextResponse.json({ error: "Invalid token" }, { status: 401 });
	}
}

export async function POST(req: Request) {
	const { username, password } = await req.json();

	if (username === "testuser" && password === "password") {
		const token = jwt.sign(
			{ id: 1, username: "testuser", email: "testuser@example.com" },
			SECRET_KEY,
			{ expiresIn: "1h" },
		);

		return NextResponse.json({ token });
	}

	return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
