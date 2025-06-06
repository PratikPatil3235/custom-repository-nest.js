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

  async updateUser(
    id: number,
    name: string | null,
    age: number | null,
  ): Promise<User | null> {
    try {
      const user = await this.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} Not Found`);
      }
      user.age = age ?? user.age;
      user.name = name ?? user.name;

      return this.save(user);
    } catch (error) {
      throw new NotFoundException(`Something went wrong please try again`);
    }
  }
}
