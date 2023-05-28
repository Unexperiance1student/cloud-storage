export interface LoginFormDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

export type RegisterFormDto = LoginFormDto & { fullName: string };
export type RegisterResponseDto = LoginResponseDto;

export interface User {
  id: number;
  email: string;
  fullName: string;
}
