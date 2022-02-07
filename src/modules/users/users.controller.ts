import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { HasRole } from 'src/common/decorators/roles.decorator';
import { NotFoundInterceptor } from 'src/common/interceptors/not-found.interceptor';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@UseInterceptors(NotFoundInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user).serialize());
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return (await this.userService.findById(id)).serialize();
  }
}
