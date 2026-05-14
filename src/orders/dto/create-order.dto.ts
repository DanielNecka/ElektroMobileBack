import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Tesla' })
  @IsString()
  brand!: string;

  @ApiProperty({ example: 'Model 3' })
  @IsString()
  model!: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  kwh!: number;

  @ApiProperty({ example: 52.2297 })
  @IsNumber()
  locationLat!: number;

  @ApiProperty({ example: 21.0122 })
  @IsNumber()
  locationLng!: number;
}