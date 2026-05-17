import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Złóż zamówienie ładowania' })
  create(@Req() req, @Body() dto: CreateOrderDto) {
    console.log('Received order DTO:', dto);
    console.log('User:', req.user);
    return this.ordersService.create(req.user.uid, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Moje zamówienia' })
  findAll(@Req() req) {
    return this.ordersService.findAll(req.user.uid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Szczegóły zamówienia' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Zmień status zamówienia (operator)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }

  @Patch(':id/accept')
  @ApiOperation({ summary: 'Zaakceptuj zamówienie przez kierowcę' })
  acceptOrder(@Param('id') id: string, @Req() req) {
    return this.ordersService.acceptOrder(id, req.user.uid);
  }
}