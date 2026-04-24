import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Rejestracja użytkownika po zalogowaniu przez Firebase' })
  register(@Req() req, @Body() dto: RegisterDto) {
    return this.authService.register(req.user.uid, dto);
  }

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Pobierz dane zalogowanego użytkownika' })
  getMe(@Req() req) {
    return this.authService.getMe(req.user.uid);
  }
}