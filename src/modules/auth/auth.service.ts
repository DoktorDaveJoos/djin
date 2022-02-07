import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/services/password.service';
import { UserLoginDto } from 'src/modules/users/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwortService: PasswordService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    await this.passwortService.checkPassword(user, password);
    return user;
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.usersService.findByEmail(userLoginDto.email);

    return {
      access_token: this.jwtService.sign({
        username: user.entity.email,
        role: user.entity.role,
        sub: user.entity.id,
      }),
    };
  }
}
