import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"


export class BaseFilterDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id?:string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    limit?:number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    skip?:number

}