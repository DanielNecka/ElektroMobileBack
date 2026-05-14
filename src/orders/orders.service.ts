import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

const PRICE_PER_KWH = 2;
const TRAVEL_FEE = 30;

@Injectable()
export class OrdersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(uid: string, dto: CreateOrderDto) {
    const db = this.firebaseService.getDb();

    const energyKwh = Number(dto.kwh.toFixed(2));
    const totalPrice = Number((energyKwh * PRICE_PER_KWH + TRAVEL_FEE).toFixed(2));

    const order = {
      userId: uid,
      brand: dto.brand,
      model: dto.model,
      kwh: energyKwh,
      locationLat: dto.locationLat,
      locationLng: dto.locationLng,
      totalPrice,
      statusId: 'Szukamy kierowcy',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const ref = await db.collection('orders').add(order);
    return { id: ref.id, ...order };
  }

  async findAll(uid: string) {
    const snapshot = await this.firebaseService.getDb()
      .collection('orders')
      .where('userId', '==', uid)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.firebaseService.getDb()
      .collection('orders')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Zamówienie nie znalezione');
    }

    return { id: doc.id, ...doc.data() };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const ref = this.firebaseService.getDb().collection('orders').doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      throw new NotFoundException('Zamówienie nie znalezione');
    }

    await ref.update({
      statusId: dto.statusId,
      updatedAt: new Date(),
    });

    return { id, ...doc.data(), statusId: dto.statusId };
  }
}