import { User } from '@prisma/client';

export class UserMapper {
  static mapUserToUserDto(user: User): UserDto {
    const dto = { ...user };
    delete dto.password;
    return dto as UserDto;
  }
}

export type UserDto = {
  id: number;
  name: string;
  email: string;
};
