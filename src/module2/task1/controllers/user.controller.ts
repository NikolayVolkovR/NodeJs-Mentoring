import {
  findUserById,
  findUsers,
  handleUserCreate,
  handleUserDelete,
  handleUserUpdate,
} from '../services/user.service';
import { users } from '../models/user/users.data';
import Ajv from 'ajv';
import { default as ajvErrors } from 'ajv-errors';
import { RequestHandler } from 'express';
import { userCreateSchema, usersAutoSuggestSchema, userSchema } from '../models/user/user.shema';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

export const getUsersController: RequestHandler = (req, res) => {
  return res.json(users);
};

export const userGetByIdController: RequestHandler = (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);

  if (user === undefined) {
    return res.status(400).json({ status: 400, error: `Not found User with id ${userId}` });
  }
  res.status(200).json({ status: 200, user: user });
};

export const usersGetAutoSuggestController: RequestHandler = (req, res) => {
  const validate = ajv.compile(usersAutoSuggestSchema);
  const { limit, login } = req.body;
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).json({ status: 400, errors: validate.errors });
  }

  const users = findUsers(limit, login);
  res.status(200).json({ status: 200, users: users });
};

export const userCreateController: RequestHandler = (req, res) => {
  const validate = ajv.compile(userCreateSchema);
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).json({ status: 400, errors: validate.errors });
  }

  const user = handleUserCreate(req.body);

  res.location(`/users/${user.id}`);
  res.status(201).json({ status: '201', user: user });
};

export const userUpdateController: RequestHandler = (req, res) => {
  const data = req.body;
  const validate = ajv.compile(userSchema);
  const isValid = validate(data);

  if (!isValid) {
    res.status(400).json({status: 400, error: validate.errors})
  }

  const user = findUserById(req.params.id); // todo model.update(data)
  handleUserUpdate(req.params.id, data);
  res.status(200).json({status: 200, user: user})
};

export const userDeleteController: RequestHandler = (req, res) => {
  handleUserDelete(req.params.id);
  res.end();
};
