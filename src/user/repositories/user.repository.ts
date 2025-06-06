import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { NotFoundException } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser(name: string, age: number): Promise<User> {
    const user = this.create({ name, age });
    return await this.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.find();
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (err) {
      throw new NotFoundException(`Somethingb went wrong please try again`);
    }
  }
}
