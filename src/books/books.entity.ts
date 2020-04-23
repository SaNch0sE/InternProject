import { Entity, Column, ObjectIdColumn, ObjectID, } from 'typeorm';
import { PublishedDto } from './dto/published.dto';

@Entity('books')
export class Books {
  @ObjectIdColumn() id: ObjectID;

  @Column() blogpost: number;

  @Column() title: string;

  @Column() author: string;

  @Column() published: PublishedDto[];
}