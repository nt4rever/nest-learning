import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    firstName?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName?: string;
}
