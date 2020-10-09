import { UserModel, GroupModel } from "../models";
import { db } from "./db";

export const preFillTables = async () => {
    await db.sequelize.transaction(async (t) => {
        await UserModel.bulkCreate(
            [
                {
                    login: "Maria",
                    password: "MariaPassword1",
                    age: 18,
                },
                {
                    login: "Pavel",
                    password: "PavelPassword1",
                    age: 30,
                },
                {
                    login: "Evgeny",
                    password: "EvgenyPassword1",
                    age: 45,
                },
            ],
            { validate: true, transaction: t },
        );

        await GroupModel.bulkCreate(
            [
                {
                    name: "User",
                    permissions: "['READ']",
                },
                {
                    name: "Developer",
                    permissions: "['READ', 'WRITE']",
                },
                {
                    name: "Admin",
                    permissions: "['READ', 'DELETE']",
                },
            ],
            { validate: true, transaction: t },
        );

        const userMaria = await UserModel.findOne({
            where: {
                login: "Maria",
            },
            transaction: t,
        });
        const groupUser = await GroupModel.findOne({
            where: {
                name: "User",
            },
            transaction: t,
        });

        await userMaria.addGroup(groupUser, { transaction: t });
    });
};
