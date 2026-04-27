import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'Ładowanie',
    enum: ['Szukamy kierowcy', 'Kierowca przydzielony', 'W drodze', 'Ładowanie', 'Zakończone'],
  })
  @IsString()
  statusId!: string;
}