import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsBoolean,
    IsNotEmpty
} from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(26)
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(26)
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(26)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(15)
    readonly phone: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly isAdmin: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly verified: boolean;
}