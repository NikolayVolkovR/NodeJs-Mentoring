import { NextFunction, Request, Response } from 'express';
import { GroupService } from '../../services/group.service';
import { GroupRepository } from '../../repositories/group.repository';
import { controllerErrorDecorator } from '../../helpers/decorators/controller-error.decorator';

const repository = new GroupRepository();
const service = new GroupService(repository);

export class GroupController {
    @controllerErrorDecorator
    static async checkExists(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const group = await service.getById(parseInt(id));

        if (group === null) {
            return res.status(400).json({ status: 400, error: `Not found Group with id ${id}` });
        }

        res.locals.item = group;

        next();
    }

    @controllerErrorDecorator
    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const group = await service.getById(parseInt(id));

        return res.json({ status: 200, group });
    }

    @controllerErrorDecorator
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const groups = await service.getAll();

        return res.json({ status: 200, groups });
    }

    @controllerErrorDecorator
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await service.create(req.body);

            return res.location(`/groups/${group.id}`).status(201).json({ status: 201, group });
        } catch (error) {
            next(error);
        }
    }

    @controllerErrorDecorator
    static async update(req: Request, res: Response, next: NextFunction) {
        const group = await service.create(req.body);

        return res.location(`/groups/${group.id}`).status(201).json({ status: 201, group });
    }

    @controllerErrorDecorator
    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        await service.delete(parseInt(id));

        return res.json({ status: 200 });
    }
}
