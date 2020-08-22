import { UserService } from '../services/user.service';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.getAll();

    return res.json(users);
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    return res.status(200).json({ status: 200, user: user });
  }

  static async autoSuggest(req: Request, res: Response, next: NextFunction) {
    const { limit, login } = req.body;
    const users = await UserService.getSuggest(limit, login);

    return res.status(200).json({ status: 200, users: users });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.create(req.body);

    return res.location(`/users/${user.id}`).status(201).json({ status: '201', user: user });
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.update(req.params.id, req.body);

    return res.status(200).json({ status: 200, user: user });
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    await UserService.delete(user);
    return res.status(200).json({ status: 200 });
  }
}