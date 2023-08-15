import { ITask } from "@/types/type";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`);
  const todos = res.json();
  return todos;
};
