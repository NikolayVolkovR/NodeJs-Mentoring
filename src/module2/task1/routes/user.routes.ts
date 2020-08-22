import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../validators/user/user.validator';

export const userRouter = Router();

userRouter.route('/users').get(UserController.getAll).post(UserValidator.create, UserController.create);

userRouter.route('/users/auto-suggest').post(UserValidator.autoSuggest, UserController.autoSuggest);

userRouter
  .route('/users/:id')
  .get(UserValidator.checkExits, UserController.getById)
  .put(UserValidator.checkExits, UserValidator.update, UserController.update)
  .delete(UserValidator.checkExits, UserController.delete);
