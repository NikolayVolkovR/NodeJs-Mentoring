import { Request, Response } from "express";
import { UserGroupType } from "../../models";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";
import { GroupService } from "../../services/group.service";
import { GroupRepository } from "../../repositories/group.repository";
import { controllerErrorDecorator } from "../../helpers/decorators/controller-error.decorator";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);

export class UserGroupsController {
    @controllerErrorDecorator
    static async addUsersToGroup(req: Request, res: Response) {
        const { users, groupId }: UserGroupType = req.body;

        for (let userId of users) {
            const exists = await userService.checkExists(userId);
            if (!exists) {
                return res.status(400).json({
                    status: 400,
                    error: `User with ID ${userId} doesn't exist`,
                });
            }
        }

        const groupExists = await groupService.checkExists(parseInt(groupId));
        if (!groupExists) {
            return res.status(400).json({
                status: 400,
                error: `Group with ID ${groupId} doesn't exist`,
            });
        }

        const adding = await groupService.addUsers(users, parseInt(groupId));

        return res.json({ status: 200, text: adding });
    }
}
