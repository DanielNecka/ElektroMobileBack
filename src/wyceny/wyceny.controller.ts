import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WycenaRequestDto } from './dto/wycena-request.dto';
import { WycenyService } from './wyceny.service';

@ApiTags('Wyceny')
@Controller('wyceny')
export class WycenyController {
  constructor(private readonly wycenyService: WycenyService) {}

  @Post()
async obliczPost(@Body() dto: WycenaRequestDto) {
  return await this.wycenyService.obliczWycene(dto);
}

@Get()
async obliczGet(@Query('kWh') kWh: string,
                @Query('cena') cena: string,
                @Query('oplata') oplata: string) {
  return await this.wycenyService.obliczWycene({
    kWh: +kWh, cena: +cena, oplata: +oplata,
  });
}
}