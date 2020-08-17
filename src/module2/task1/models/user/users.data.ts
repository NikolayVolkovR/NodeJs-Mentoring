import { v4 as uuidv4 } from "uuid";
import {userProps} from "./user.types";

export const users: userProps[] = [
  {
    id: uuidv4(),
    login: "vasily",
    password: "vasily1",
    age: 18,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "valya",
    password: "valya2",
    age: 19,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "vadim",
    password: "vadim3",
    age: 25,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: "slava",
    password: "slava4",
    age: 32,
    isDeleted: false,
  },
];
