import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { PublishedDto } from './published.dto';

export class BookDto {
    @IsNumber()
    @IsNotEmpty()
    readonly blogpost: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    readonly author: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => PublishedDto)
    readonly published: PublishedDto[];
}