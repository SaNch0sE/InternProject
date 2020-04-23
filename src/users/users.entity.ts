import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('users')
export class Users {
  @ObjectIdColumn() id: ObjectID;

  @Column() firstName: string;

  @Column() lastName: string;

  @Column() email: string;

  @Column() phone: string;

  @Column() isAdmin: boolean;

  @Column() verified: boolean;
}