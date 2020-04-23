import {
    IsString,
    IsNumber,
    Min,
    Max,
    MinLength,
    MaxLength, IsNotEmpty,
} from 'class-validator';

export class PublishedDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    readonly publisher: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(400)
    @Max(4000)
    readonly year: number;
}