import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Yeni istifadəçi qeydiyyatı' })
  @ApiCreatedResponse({
    description: 'İstifadəçi yaradıldı, access + refresh token qaytarıldı',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Validation xətası və ya email artıq var' })
  register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login olub token almaq' })
  @ApiOkResponse({
    description: 'Login uğurlu, access + refresh token qaytarıldı',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Email və ya şifrə yanlışdır' })
  login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token ilə yeni tokenlər almaq' })
  @ApiOkResponse({
    description: 'Tokenlər yeniləndi',
    type: AuthResponseDto,
  })
  @ApiForbiddenResponse({ description: 'Refresh token yanlışdır və ya vaxtı bitib' })
  refresh(@Body() dto: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.authService.refreshTokens(dto);
  }
}