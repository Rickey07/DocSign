import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/shared/domain/Models/user.model';
import { User as UserEntity } from '../entities/user.entity';
// import { UserRepository } from 'src/shared/domain/Repositories/userRepository.interface';

@Injectable()
export class DatabaseUserRepository {
  constructor(
    @InjectModel('User') private readonly userRepo: Model<UserEntity>, // private readonly userEntity: UserRepository,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    console.log(email, password);
    const newUser = new this.userRepo(email, password);
    const createdUser = await newUser.save();
    return createdUser;
  }

  async findUserByEmail(email: string): Promise<User> {
    const existingUser = await this.userRepo.findOne({ email: email });
    return existingUser;
  }
}
