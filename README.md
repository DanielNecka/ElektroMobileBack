README.md — zaktualizuj całość:
markdown# ⚡ Elektromobile API — NestJS + Firebase

Backend platformy do mobilnego ładowania samochodów elektrycznych.

## Stack
- NestJS
- Firebase Admin SDK (Firestore + Authentication)
- Swagger / OpenAPI
- class-validator

## Instalacja

```bash
npm install
```

## Uruchomienie

```bash
# tryb deweloperski
npm run start:dev

# produkcja
npm run build
npm run start:prod
```

Serwer: **http://localhost:3000**
Swagger: **http://localhost:3000/api**

## Konfiguracja

Wrzuć plik klucza Firebase do głównego folderu projektu:
firebase-key.json
Upewnij się że jest w `.gitignore`.

## Endpointy (aktualne)

### Auth
| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/auth/register` | Rejestracja użytkownika po Firebase Auth |
| GET | `/auth/me` | Dane zalogowanego użytkownika |

### Wyceny
| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/wyceny` | Oblicz koszt ładowania (kWh × cena + opłata) |
| GET | `/wyceny` | To samo przez query params |

## Struktura projektu
src/
├── auth/
│   ├── dto/register.dto.ts
│   ├── firebase-auth.guard.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── firebase/
│   ├── firebase.service.ts
│   └── firebase.module.ts
├── wyceny/
│   ├── dto/
│   ├── wyceny.controller.ts
│   ├── wyceny.service.ts
│   └── wyceny.module.ts
├── app.module.ts
└── main.ts

## Firestore — kolekcje

| Kolekcja | Opis |
|----------|------|
| `users` | Klienci, operatorzy, adminowie |
| `orders` | Zamówienia ładowania |
| `vehicles` | Modele EV z parametrami |
| `statuses` | Statusy zamówień z kolorami |

## TODO (kolejne zadania)

- [ ] API modeli EV (`/vehicles`)
- [ ] Endpoint wyceny powiązany z pojazdem
- [ ] API zamówień + zmiany statusów
- [ ] Integracja Mapbox (ETA, odległość)
- [ ] API panelu admina (statystyki, ceny)