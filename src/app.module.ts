import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WycenyModule } from './wyceny/wyceny.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';


@Module({
  imports: [WycenyModule, FirebaseModule, AuthModule, VehiclesModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
