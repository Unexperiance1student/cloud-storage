import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) throw new BadRequestException('Невернные данные');
    if (user && validatePassword) {
      const { password, ...result } = user;
      return result;
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const existUser = await this.usersService.findByEmail(dto.email);
      if (existUser)
        throw new BadRequestException(
          'Пользователь с такой почтой уже существует',
        );
      dto.password = await this.hashPassword(dto.password);
      const newUser = {
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password,
      };
      const userData = await this.usersService.create(newUser);
      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
