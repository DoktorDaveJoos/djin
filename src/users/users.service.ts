import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { stringify } from 'querystring';
import { UserDto, UserMapper } from './user.model';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: number): Promise<UserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });
      return UserMapper.mapUserToUserDto(user);
    } catch (err) {
      throw new Error(`Could not find a user with id: ${id}`);
    }
  }

  async findByEmail(email: string): Promise<UserDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return UserMapper.mapUserToUserDto(user);
    } catch (err) {
      throw new Error(`Could not find a user with email: ${email}`);
    }
  }
}
