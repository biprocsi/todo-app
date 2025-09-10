// TODO: Create validation middleware for todo operations

import { NextResponse } from "next/server";

export interface ValidationError {
	field: string;
	message: string;
}
