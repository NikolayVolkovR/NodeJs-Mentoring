"use strict";

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    login: "Vasia",
                    password: "Vasia111",
                    age: 23,
                    isDeleted: false,
                },
                {
                    login: "Vika",
                    password: "Vika222",
                    age: 33,
                    isDeleted: false,
                },
                {
                    login: "Misha",
                    password: "Misha333",
                    age: 43,
                    isDeleted: false,
                },
            ],
            {},
        );
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
