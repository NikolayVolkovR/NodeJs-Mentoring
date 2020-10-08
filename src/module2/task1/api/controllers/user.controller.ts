import { UserService } from '../../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../repositories/user.repository';
import { controllerErrorDecorator } from '../../helpers/decorators/controller-error.decorator';

const repository = new UserRepository();
const service = new UserService(repository);

export class UserController {
    @controllerErrorDecorator
    static async checkExists(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        res.locals.user = await service.getById(parseInt(id));
        next();
    }

    @controllerErrorDecorator
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await service.getAll();

        return res.json(users);
    }

    @controllerErrorDecorator
    static async getById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const user = await service.getById(parseInt(id));

        return res.json({ user });
    }

    @controllerErrorDecorator
    static async autoSuggest(req: Request, res: Response, next: NextFunction) {
        const { limit, login } = req.body;
        const users = await service.getSuggest(limit, login);

        return res.status(200).json({ status: 200, users });
    }

    @controllerErrorDecorator
    static async create(req: Request, res: Response, next: NextFunction) {
        const user = await service.create(req.body);

        return res.location(`/users/${user.id}`).status(201).json({ status: 201, user });
    }

    @controllerErrorDecorator
    static async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const user = await service.update(parseInt(id), req.body);

        return res.status(200).json({ status: 200, user });
    }

    @controllerErrorDecorator
    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        await service.delete(parseInt(id));

        return res.status(204).end();
    }

    @controllerErrorDecorator
    static async login(req: Request, res: Response, next: NextFunction) {
        const { login, password } = req.body;
        const token = await service.getAuthToken(login, password);

        return res.send(token)
    }
}
