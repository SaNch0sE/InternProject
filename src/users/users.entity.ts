import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') name: string;

  @Column('text') surname: string;

  @Column() email: string;
}