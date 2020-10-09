import { Optional } from "sequelize";

export interface UserAttributes {
    id: number;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserCreateAttributes extends Optional<UserAttributes, "id" | "isDeleted"> {}

export interface UserUpdateAttributes
    extends Optional<UserAttributes, "id" | "login" | "password" | "age" | "isDeleted"> {}
