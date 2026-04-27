import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll() {
    const snapshot = await this.firebaseService.getDb()
      .collection('vehicles')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.firebaseService.getDb()
      .collection('vehicles')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Pojazd nie znaleziony');
    }

    return { id: doc.id, ...doc.data() };
  }

  async create(uid: string, dto: CreateVehicleDto) {
    const data = {
      ...dto,
      userId: uid,
      createdAt: new Date(),
    };

    const ref = await this.firebaseService.getDb()
      .collection('vehicles')
      .add(data);

    return { id: ref.id, ...data };
  }

  async update(id: string, dto: UpdateVehicleDto) {
    const ref = this.firebaseService.getDb()
      .collection('vehicles')
      .doc(id);

    const doc = await ref.get();
    if (!doc.exists) {
      throw new NotFoundException('Pojazd nie znaleziony');
    }

    await ref.update({ ...dto, updatedAt: new Date() });
    return { id, ...doc.data(), ...dto };
  }

  async remove(id: string) {
    const ref = this.firebaseService.getDb()
      .collection('vehicles')
      .doc(id);

    const doc = await ref.get();
    if (!doc.exists) {
      throw new NotFoundException('Pojazd nie znaleziony');
    }

    await ref.delete();
    return { message: 'Pojazd usunięty' };
  }
}