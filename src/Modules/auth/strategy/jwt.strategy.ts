import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environmentVariables } from '../../../config/env.variables';
import { AuthService } from '../auth.service';
import { UserResult } from './Interface/strategy.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environmentVariables.secret,
    });
  }

  async validate(payload: { email: string }): Promise<UserResult> {
    const user = await this.authService.findUserByEmail(payload.email);

    if (!user) {
      return;
    }

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
