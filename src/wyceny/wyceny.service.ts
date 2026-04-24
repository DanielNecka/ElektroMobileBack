import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { WycenaRequestDto } from './dto/wycena-request.dto';

@Injectable()
export class WycenyService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async obliczWycene(dto: WycenaRequestDto) {
    const { kWh, cena, oplata } = dto;
    const kosztEnergii = parseFloat((kWh * cena).toFixed(2));
    const lacznaKwota  = parseFloat((kosztEnergii + oplata).toFixed(2));

    const wynik = { kWh, cena, oplata, kosztEnergii, lacznaKwota, timestamp: new Date() };

    // Zapis do Firestore
    await this.firebaseService.getDb()
      .collection('wyceny')
      .add(wynik);

    return wynik;
  }
}