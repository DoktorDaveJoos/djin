import { User } from '@prisma/client';
import { BaseEntity } from 'src/common/entities/base.entity';

export class UserEntity extends BaseEntity<User> {
  protected excludes: (keyof User)[] = ['password'];
}
