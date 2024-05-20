import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/Auth/auth.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  async create(createUserDto: UserDto) {
    try {
      const user = new User();
      const { name, password, email } = createUserDto;
      user.name = name;
      user.email = email;
      user.password = await bcrypt.hash(password, 10);

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
      await this.userRepository.save(user);

      return {
        statusCode: 200,
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      if (!email || !password) {
        return {
          statusCode: 400,
          message: 'Email or password cannot be empty',
        };
      }

      const user = await this.authService.validateUser(email, password);
      if (!user) {
        return {
          statusCode: 400,
          message: 'Invalid credentials',
        };
      } else {
        const errors = await validate(user);
        if (errors.length > 0) {
          throw new BadRequestException(errors);
        }

        const { access_token } = await this.authService.createToken(user);

        if (!access_token || access_token === null) {
          return {
            statusCode: 400,
            message: 'failed login attempt',
            access_token: [],
          };
        } else {
          return {
            statusCode: 201,
            message: 'login successfully',
            access_token: access_token,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
