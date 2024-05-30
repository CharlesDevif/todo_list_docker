import { Router, Request, Response } from 'express';
import TodoController from '../controllers/todoController';
import { IDB } from '../interfaces/db';

const router = Router();

export default (dbInstance: IDB): Router => {
  const todoController = new TodoController(dbInstance);

  router.post('/addTodo', async (req: Request, res: Response) => {
    await todoController.createTodo(req, res);
  });

  router.put('/updateTodo/:id', async (req: Request, res: Response) => {
    await todoController.updateTodo(req, res);
  });

  router.delete('/delTodo/:id', async (req: Request, res: Response) => {
    await todoController.deleteTodo(req, res);
  });

  router.get('/todos/all', async (req: Request, res: Response) => {
    await todoController.getTodos(req, res);
  });

  router.get('/todos/:id', async (req: Request, res: Response) => {
    await todoController.getTodoById(req, res);
  });

  return router;
};
