import { User } from '../Models/user.model';

export interface UserRepository {
  createUser(email: string, password: string): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
