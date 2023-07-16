import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  firstname?: string;
  lastname?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthResult {
  email: string;
  firstname: string;
  lastname: string;
  token: string;
}

export interface IGenerateToken {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}
