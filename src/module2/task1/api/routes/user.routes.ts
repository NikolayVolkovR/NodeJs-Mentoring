import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserValidator } from '../../validators/user/user.validator';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.route('/').get(UserController.getAll).post(UserValidator.create, UserController.create);
  route.route('/auto-suggest').post(UserValidator.autoSuggest, UserController.autoSuggest);
  route
    .use('/:id', UserController.checkExits)
    .route('/:id')
    .get(UserController.getById)
    .put(UserValidator.update, UserController.update)
    .delete(UserController.delete);
};
