import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async createUser(name: string, age: number): Promise<User> {
    return await this.userRepository.createUser(name, age);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async getUserById(id: number) {
    return await this.userRepository.getUserById(id);
  }
}
