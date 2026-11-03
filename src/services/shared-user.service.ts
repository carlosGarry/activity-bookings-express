import { UserService } from './user.service';
import { userRepository } from '../utils/data-loader';

export const userService = new UserService(userRepository);
