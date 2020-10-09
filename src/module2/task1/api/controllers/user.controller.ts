import { UserServiceType } from "../../services/user.service";
import { NextFunction, Request, Response } from "express";
import { controllerErrorDecorator } from "../../helpers/decorators/controller-error.decorator";
import logger from "../../helpers/logger";
import "babel-polyfill";

export class UserController {
    private service: UserServiceType;

    constructor(service) {
        logger.info("Creating UserController instance");
        this.service = service;
        this.checkExists = this.checkExists.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.autoSuggest = this.autoSuggest.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.login = this.login.bind(this);
    }

    @controllerErrorDecorator
    async checkExists(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        res.locals.user = await this.service.getById(parseInt(id));

        return next();
    }

    @controllerErrorDecorator
    async getAll(req: Request, res: Response, _: NextFunction) {
        const users = await this.service.getAll();

        return res.json({ users });
    }

    @controllerErrorDecorator
    async getById(req: Request, res: Response, _: NextFunction) {
        const id = req.params.id;
        const user = await this.service.getById(parseInt(id));

        return res.json({ user });
    }


    @controllerErrorDecorator
    async autoSuggest(req: Request, res: Response, _: NextFunction) {
        const { limit, login } = req.body;
        const users = await this.service.getSuggest(limit, login);

        return res.status(200).json({ users });
    }

    @controllerErrorDecorator
    async create(req: Request, res: Response, _: NextFunction) {
        const user = await this.service.create(req.body);

        return res.location(`/users/${user.id}`).status(201).json({ user });
    }

    @controllerErrorDecorator
    async update(req: Request, res: Response, _: NextFunction) {
        const id = req.params.id;
        const user = await this.service.update(parseInt(id), req.body);

        return res.json({ user });
    }

    @controllerErrorDecorator
    async delete(req: Request, res: Response, _: NextFunction) {
        const id = req.params.id;
        await this.service.delete(parseInt(id));

        return res.status(204).end();
    }

    @controllerErrorDecorator
    async login(req: Request, res: Response, _: NextFunction) {
        const { login, password } = req.body;
        const token = await this.service.getAuthToken(login, password);

        return res.send(token);
    }
}
