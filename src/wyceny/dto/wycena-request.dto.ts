import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';


export class WycenaRequestDto {
  @ApiProperty({ example: 150 })
  @IsNumber() @Min(0)
  kWh!: number;

  @ApiProperty({ example: 0.72 })
  @IsNumber() @Min(0)
  cena!: number;

  @ApiProperty({ example: 25 })
  @IsNumber() @Min(0)
  oplata!: number;
}