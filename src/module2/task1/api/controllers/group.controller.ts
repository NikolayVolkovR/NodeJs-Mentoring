import { NextFunction, Request, Response } from "express";
import { GroupServiceType } from "../../services/group.service";
import { controllerErrorDecorator } from "../../helpers/decorators/controller-error.decorator";
import logger from "../../helpers/logger";
import "babel-polyfill";

export class GroupController {
    private service: GroupServiceType;

    constructor(service) {
        logger.info("Creating GroupController instance");
        this.service = service;
        this.checkExists = this.checkExists.bind(this);
        this.getById = this.getById.bind(this);
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    @controllerErrorDecorator
    async checkExists(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        const group = await this.service.getById(parseInt(id));

        if (group === null) {
            return res.status(400).json({ status: 400, error: `Not found Group with id ${id}` });
        }

        res.locals.item = group;

        return next();
    }

    @controllerErrorDecorator
    async getById(req: Request, res: Response, _: NextFunction) {
        const id = req.params.id;
        const group = await this.service.getById(parseInt(id));

        return res.json({ group });
    }

    @controllerErrorDecorator
    async getAll(req: Request, res: Response, _: NextFunction) {
        const groups = await this.service.getAll();

        return res.json({ groups });
    }

    @controllerErrorDecorator
    async create(req: Request, res: Response, _: NextFunction) {
        const group = await this.service.create(req.body);

        return res.location(`/groups/${group.id}`).status(201).json({ group });
    }

    @controllerErrorDecorator
    async update(req: Request, res: Response, _: NextFunction) {
        const group = await this.service.create(req.body);

        return res.location(`/groups/${group.id}`).status(201).json({ group });
    }

    @controllerErrorDecorator
    async delete(req: Request, res: Response, _: NextFunction) {
        const id = req.params.id;
        await this.service.delete(parseInt(id));

        return res.status(204).end();
    }
}
