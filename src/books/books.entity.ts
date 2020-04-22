import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Books {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') code3: string;

  @Column('text') title: string;

  @Column('text') description: string;

  @Column('int') createdAt: number;

  @Column('int') updatedAt: number;
}