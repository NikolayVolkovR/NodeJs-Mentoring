import { Router } from 'express';
import {
  getUsersController,
  userCreateController,
  usersGetAutoSuggestController,
  userGetByIdController,
  userDeleteController,
  userUpdateController,
} from '../controllers/user.controller';

export const userRouter = Router();

userRouter.route('/users').get(getUsersController).post(userCreateController);

userRouter.route('/users/auto-suggest').post(usersGetAutoSuggestController);

userRouter.route('/users/:id').get(userGetByIdController).put(userUpdateController).delete(userDeleteController);
