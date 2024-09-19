import { User } from '../model/user.model';

export interface UserRepository {
  getById(id: number): Promise<User>;
  post(user: User): Promise<User>;
}

export const UserRepository = Symbol.for('UserRepository');
