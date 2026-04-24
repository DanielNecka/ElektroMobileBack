import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async register(uid: string, dto: RegisterDto) {
    const db = this.firebaseService.getDb();
    const userRef = db.collection('users').doc(uid);
    const existing = await userRef.get();

    if (existing.exists) {
      throw new ConflictException('Użytkownik już istnieje');
    }

    const userData = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      role: dto.role ?? 'client',
      createdAt: new Date(),
    };

    await userRef.set(userData);
    return { uid, ...userData };
  }

  async getMe(uid: string) {
    const db = this.firebaseService.getDb();
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      throw new NotFoundException('Użytkownik nie znaleziony');
    }

    return { uid: doc.id, ...doc.data() };
  }
}