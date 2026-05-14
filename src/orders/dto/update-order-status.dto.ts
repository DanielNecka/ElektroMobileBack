import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'Ładowanie',
    enum: ['Oczekuje na kierowce', 'Kierowca przydzielony', 'W drodze', 'Ładowanie', 'Zakończone'],
  })
  @IsString()
  statusId!: string;
}