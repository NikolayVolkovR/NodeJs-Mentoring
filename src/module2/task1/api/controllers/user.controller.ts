import { UserService } from '../../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../repositories/user.repository';
import { errorDecorator } from "../../helpers/decorators/error.decorator";

const repository = new UserRepository();
const service = new UserService(repository);

export class UserController {
    static async checkExists(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const user = await service.getById(parseInt(id));

        if (user === null) {
            return res.status(400).json({ status: 400, error: `Not found User with id ${id}` });
        }

        res.locals.user = user;

        next();
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await service.getAll();

            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    //@errorDecorator
    static async getById(req: Request, res: Response, next: NextFunction) {
        /*const id = req.params.id;
        const user = await service.getById(parseInt(id));

        return res.json({ user });*/
        try {
            const id = req.params.id;
            const user = await service.getById(parseInt(id));

            return res.json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async autoSuggest(req: Request, res: Response, next: NextFunction) {
        try {
            const { limit, login } = req.body;
            const users = await service.getSuggest(limit, login);

            return res.status(200).json({ status: 200, users });
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await service.create(req.body);

            return res.location(`/users/${user.id}`).status(201).json({ status: 201, user });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await service.update(parseInt(id), req.body);

            return res.status(200).json({ status: 200, user });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await service.delete(parseInt(id));

            return res.status(200).json({ status: 200 });
        } catch (error) {
            next(error);
        }
    }
}
