import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;
  
  @ApiProperty({ type: String })
  @IsString()
  username: string;
  
  @ApiProperty({ type: Number })
  @IsNumber()
  age: number;
  
  @ApiProperty({ type: String })
  @IsString()
  job: string;
}
