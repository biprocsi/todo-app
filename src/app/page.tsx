"use client";
import { useEffect, useState } from "react";

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const res = await fetch("/api/todos");
		const data = await res.json();
		setTodos(data);
	};

	const addTodo = async () => {
		const res = await fetch("/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: newTodo }),
		});
		const todo = await res.json();
		setTodos([...todos, todo]);
		setNewTodo("");
	};

	const toggleTodo = async (id: number, completed: boolean) => {
		await fetch(`/api/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed: !completed }),
		});
		fetchTodos();
	};

	const deleteTodo = async (id: number) => {
		await fetch(`/api/todos/${id}`, { method: "DELETE" });
		fetchTodos();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

				<div className="flex mb-4">
					<input
						type="text"
						className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none"
						placeholder="Add new task"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
					<button
						onClick={addTodo}
						className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
						type="button"
					>
						Add
					</button>
				</div>
				<ul className="space-y-3">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow"
						>
							<div className="flex items-center space-x-3">
								<input
									type="checkbox"
									checked={todo.completed}
									onChange={() => toggleTodo(todo.id, todo.completed)}
									className="form-checkbox h-5 w-5 text-blue-500"
								/>
								<span
									className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}
								>
									{todo.title}
								</span>
							</div>
							<button
								onClick={() => deleteTodo(todo.id)}
								className="text-red-500 hover:text-red-600"
								type="button"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
