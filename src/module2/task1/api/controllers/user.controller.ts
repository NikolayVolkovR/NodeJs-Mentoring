import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user/user.model';
import { RequestHandler, Request, Response } from 'express';

const userService = new UserService(UserModel);

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await userService.getAll();

    return res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const user = res.locals.user;

    return res.status(200).json({ status: 200, user: user });
  }

  static async autoSuggest(req: Request, res: Response) {
    const { limit, login } = req.body;
    const users = await userService.getSuggest(limit, login);

    return res.status(200).json({ status: 200, users: users });
  }

  static async create(req: Request, res: Response) {
    const user = await userService.create(req.body);

    return res.location(`/users/${user.id}`).status(201).json({ status: '201', user: user });
  }

  static async update(req: Request, res: Response) {
    const user = await userService.update(req.params.id, req.body);

    return res.status(200).json({ status: 200, user: user });
  }

  static async delete(req: Request, res: Response) {
    const user = res.locals.user;

    await userService.delete(user);
    return res.status(200).json({ status: 200 });
  }
}
