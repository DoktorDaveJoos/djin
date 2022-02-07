import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class PasswordService {
  async checkPassword(user: UserEntity, password: string) {
    const matched = await compare(password, user.entity.password);
    if (!matched)
      throw new UnauthorizedException('Password could not be verified.');
  }

  async hashPassword(password: string) {
    return await hash(password, process.env.SALT_ROUNDS);
  }
}
