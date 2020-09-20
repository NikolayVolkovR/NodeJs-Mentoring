import { NextFunction, Request, Response } from 'express';
import { GroupService } from '../../services/group.service';
import { GroupRepository } from '../../repositories/group.repository';

const repository = new GroupRepository();
const service = new GroupService(repository);

export class GroupController {
  static async checkExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const group = await service.getById(parseInt(id));

    if (group === null) {
      return res.status(400).json({ status: 400, error: `Not found User with id ${id}` });
    }

    res.locals.item = group;

    next();
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id;
    const group = await service.getById(parseInt(id));

    return res.json({ status: 200, group });
  }

  static async getAll(req: Request, res: Response) {
    const groups = await service.getAll();

    return res.json({ status: 200, groups });
  }

  static async create(req: Request, res: Response) {
    const group = await service.create(req.body);

    return res.location(`/groups/${group.id}`).status(201).json({ status: 201, group });
  }

  static async update(req: Request, res: Response) {
    const group = res.locals.item;

    Object.assign(group, req.body);
    await group.save();

    return res.json({status: 200, group});
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;
    await service.delete(parseInt(id));

    return res.json({ status: 200 });
  }
}
