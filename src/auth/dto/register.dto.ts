import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+48123456789' })
  @IsString()
  phone!: string;

  @ApiProperty({ example: 'client', enum: ['client', 'operator', 'admin'] })
  @IsOptional()
  @IsString()
  role?: string;
}