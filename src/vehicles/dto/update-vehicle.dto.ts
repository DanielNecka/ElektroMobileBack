import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({ example: 'Tesla Model 3', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ example: 75, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  batteryCapacityKwh?: number;

  @ApiProperty({ example: 'CCS2', required: false })
  @IsOptional()
  @IsString()
  connectorType?: string;

  @ApiProperty({ example: 170, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxChargingKw?: number;
}