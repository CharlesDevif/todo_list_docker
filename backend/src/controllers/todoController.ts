import { Request, Response } from 'express';
import TodoModel from '../models/todoModel';
import { IDB } from '../interfaces/db';

export default class TodoController {
  private todoModel: TodoModel;

  constructor(dbInstance: IDB) {
    this.todoModel = new TodoModel(dbInstance);
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Name is required' });
        return;
      }
      const id = await this.todoModel.createTodo(name);
      res.status(201).json({ message: "Todo created successfully", todoId: id, todoName: name });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      
      if (typeof completed !== 'boolean') {
         res.status(400).json({ error: 'Invalid request, "completed" must be a boolean' });
      }
      
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      
      await this.todoModel.updateTodo(Number(id), completed);
      res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      await this.todoModel.deleteTodo(Number(id));
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoModel.getTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: 'ID is required' });
        return;
      }
      const todo = await this.todoModel.getTodoById(Number(id));
      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
