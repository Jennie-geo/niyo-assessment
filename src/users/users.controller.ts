import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto, UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('create')
  async createUser(@Body() createUserDto: UserDto) {
    const createUser = await this.userService.create(createUserDto);
    if (createUser.statusCode !== 200) {
      return {
        statusCode: 400,
        message: '',
      };
    }
    return {
      statusCode: createUser.statusCode,
      user: createUser.user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { statusCode, message, access_token } =
      await this.userService.login(loginDto);
    if (!access_token) {
      return {
        statusCode,
        message,
        access_token: [],
      };
    }
    return {
      statusCode,
      message,
      token: access_token,
    };
  }
}
