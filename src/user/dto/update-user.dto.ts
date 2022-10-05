import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ type: String })
    @IsString()
    name: string;

    @ApiPropertyOptional({ type: String })
    @IsString()
    username: string;

    @ApiPropertyOptional({ type: Number })
    @IsNumber()
    age: number;

    @ApiPropertyOptional({ type: String })
    @IsString()
    job: string;
}
