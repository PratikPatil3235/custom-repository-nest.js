import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataSource } from 'typeorm';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: ['UserRepository'],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useFactory: (dataSourse: DataSource) => new UserRepository(dataSourse),
      inject: [DataSource],
    },
    UserService,
  ],
})
export class UserModule {}
