export type TodoCategory = { id: number; name: string };
export type TodoItem = { id: number; content: string; category: number | null; completed: boolean };
