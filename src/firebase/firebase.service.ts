import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase-key.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db!: admin.firestore.Firestore;

  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    this.db = admin.firestore();
  }

  getDb() {
    return this.db;
  }
}