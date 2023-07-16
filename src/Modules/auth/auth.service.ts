import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { AuthResponse, IGenerateToken, LoginRequest, RegisterRequest } from 'src/Modules/auth/dto/auth.dto';
import { AuthRepository } from '../../Presistence/AuthRepository';
import { environmentVariables } from '../../config/env.variables';

@Injectable({})
export class AuthService {
  constructor(private authRepo: AuthRepository, private jwtService: JwtService) {}

  async logIn(LoginRequest: LoginRequest): Promise<AuthResponse> {
    const { email, password } = LoginRequest;
    let user: User;

    try {
      user = await this.findUserByEmail(email);
      if (!user) throw new ForbiddenException('Incorrect credentials');

      const passwordMatch = await argon.verify(user ? user.hash : 'not', password);
      if (!passwordMatch) throw new ForbiddenException('Incorrect credentials');
    } catch (error) {
      throw error;
    }

    const token = this.genrate({ id: user.id, email, firstname: user.firstname, lastname: user.lastname });

    return { user: user, token };
  }

  async findUserByEmail(email: string) {
    return await this.authRepo.GetUserByEmail(email);
  }

  async register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    const { email, password, firstname, lastname } = registerRequest;
    let createdUser: User;

    try {
      const hash = await argon.hash(password);
      const user = {
        email,
        hash,
        firstname,
        lastname,
      };
      createdUser = await this.authRepo.CreateUser(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new ForbiddenException('Email already in use');
      }
      throw error;
    }
    const token = this.genrate({ id: createdUser.id, email, firstname, lastname });

    return { user: createdUser, token };
  }

  private genrate({ email, id, firstname, lastname }: IGenerateToken): string {
    const payload = {
      sub: id,
      email,
      firstname,
      lastname,
    };

    const opt = {
      secret: environmentVariables.secret,
      expiresIn: environmentVariables.expires_in,
      audience: environmentVariables.audience,
      issuer: environmentVariables.issuer,
    };

    return this.jwtService.sign(payload, opt);
  }
}
