import { IDB } from '../interfaces/db';

export interface Todo {
  id?: number;
  name: string;
  completed?: boolean;
  created_at?: Date;
}

export default class TodoModel {
  private db: IDB;

  constructor(dbInstance: IDB) {
    this.db = dbInstance;
  }

  async createTodo(name: string): Promise<number> {
    const query = 'INSERT INTO todo (name, completed) VALUES (?, FALSE)';
    const values = [name];
    const result = await this.db.query(query, values);
    return result.insertId;
  }

  async updateTodo(id: number, completed: boolean): Promise<void> {
    const query = 'UPDATE todo SET completed = ? WHERE id = ?';
    const values = [completed, id];
    await this.db.query(query, values);
  }

  async deleteTodo(id: number): Promise<void> {
    const query = 'DELETE FROM todo WHERE id = ?';
    const values = [id];
    await this.db.query(query, values);
  }

  async getTodos(): Promise<Todo[]> {
    const query = 'SELECT * FROM todo';
    const rows = await this.db.query(query);
    return rows as Todo[];
  }

  async getTodoById(id: number): Promise<Todo | null> {
    const query = 'SELECT * FROM todo WHERE id = ?';
    const values = [id];
    const [rows] = await this.db.query(query, values);
    const todos = rows as Todo[];
    return todos.length ? todos[0] : null;
  }
}
