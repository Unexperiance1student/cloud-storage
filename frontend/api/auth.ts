import axios from 'axios';
import {
  LoginFormDto,
  LoginResponseDto,
  RegisterFormDto,
  RegisterResponseDto,
  User,
} from './dto/auth.dto';
import { destroyCookie } from 'nookies';
axios.defaults.baseURL = 'http://localhost:7772';

export const login = async (
  values: LoginFormDto
): Promise<LoginResponseDto> => {
  return (await axios.post('auth/login', values)).data;
};

export const register = async (
  values: RegisterFormDto
): Promise<RegisterResponseDto> => {
  return (await axios.post('auth/reg', values)).data;
};

export const getMe = async (): Promise<User> => {
  return (await axios.get('/users/me')).data;
};

export const logout = () => {
  destroyCookie(null, '_token', { path: '/.git/' });
};
