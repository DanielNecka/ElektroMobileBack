import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '0HE45eENd0Ipbzw5XwFO' })
  @IsString()
  vehicleId!: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  @Max(100)
  batteryFrom!: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(0)
  @Max(100)
  batteryTo!: number;

  @ApiProperty({ example: 52.2297 })
  @IsNumber()
  locationLat!: number;

  @ApiProperty({ example: 21.0122 })
  @IsNumber()
  locationLng!: number;
}