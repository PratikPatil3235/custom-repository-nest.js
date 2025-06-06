import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { name: string; age: number }): Promise<User> {
    return this.userService.createUser(body.name, body.age);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }
}
