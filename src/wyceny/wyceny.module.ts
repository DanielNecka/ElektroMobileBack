import { Module } from '@nestjs/common';
import { WycenyController } from './wyceny.controller';
import { WycenyService } from './wyceny.service';

@Module({
  controllers: [WycenyController],
  providers: [WycenyService]
})
export class WycenyModule {}
