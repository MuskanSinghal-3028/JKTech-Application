// incident-update.dto.ts

import { IsString, IsObject, IsOptional,IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'The id of post.' })
    id: number;
    @IsString()
    @ApiProperty({ example: 'incident', description: 'The title of post .' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'first post..', description: 'The descrption of post.' })
    description: string;


    @IsEmail()
    @IsOptional()
    @ApiProperty({ description: 'The id of user creating post.' })
    user?: string;

}


