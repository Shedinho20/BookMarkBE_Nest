import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, AuthResult, LoginRequest, RegisterRequest } from './dto';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(_authService: AuthService) {
    this.authService = _authService;
  }

  @Post('register')
  async register(@Body() registerRequest: RegisterRequest): Promise<AuthResult> {
    const response = await this.authService.register(registerRequest);

    return this.mapAuthResult(response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(@Body() loginRequest: LoginRequest): Promise<AuthResult> {
    const response = await this.authService.logIn(loginRequest);

    return this.mapAuthResult(response);
  }

  private mapAuthResult(response: AuthResponse): AuthResult {
    return {
      email: response.user.email,
      firstname: response.user.firstname,
      lastname: response.user.lastname,
      token: response.token,
    };
  }
}
