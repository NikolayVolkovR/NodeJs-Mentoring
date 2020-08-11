export const userCreateSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['login', 'password', 'age'],
    items: {
        login: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        age: {
            type: 'number'
        }
    }
};

/*user = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}*/

/*
export const userCreateSchema = {
    login: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
    age: {
        type: "number",
        required: true,
    }
};*/

/*
export const userCreateSchema = {
    "type": "object",
    "properties": {
        "login": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "age": {
            "type": "number"
        }
    },
    "required": ["login", "password", "age"],
};
*/



