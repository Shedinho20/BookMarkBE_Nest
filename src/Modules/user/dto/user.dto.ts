import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserRequest {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;
}

export interface EditUserResult {
  email: string;
  firstname: string;
  lastname: string;
}
