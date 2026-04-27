import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Tesla Model 3' })
  @IsString()
  model!: string;

  @ApiProperty({ example: 75 })
  @IsNumber()
  @Min(1)
  batteryCapacityKwh!: number;

  @ApiProperty({ example: 'CCS2' })
  @IsString()
  connectorType!: string;

  @ApiProperty({ example: 170 })
  @IsNumber()
  @Min(1)
  maxChargingKw!: number;
}