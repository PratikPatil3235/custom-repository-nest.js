import { Max, MaxLength, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(200, { message: 'Max length of your name shold be less than 200' })
  name: string;

  @Column()
  @Min(15, { message: 'Age should be more than 15 to use my app' })
  @Max(70, { message: 'Age should be less than 70 to use our app' })
  age: number;
}
