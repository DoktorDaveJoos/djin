import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user)
      throw new NotFoundException(`Could not find a user with id: ${id}`);

    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      throw new NotFoundException(`Could not find a user with email: ${email}`);

    return new UserEntity(user);
  }

  async getRoleForUser(id: number): Promise<{ role: Role }> {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        role: true,
      },
    });
  }
}
