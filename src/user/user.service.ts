import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: MySql2Database<typeof schema>,
  ) {}

  getUsers() {
    return this.db.query.user.findMany();
  }

  getUser(id: number) {
    return this.db.query.user.findFirst({
      where: eq(schema.user.id, id),
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.db.insert(schema.user).values(createUserDto);
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY')
        throw new ConflictException('User already exists');
    }
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.db
      .update(schema.user)
      .set(updateUserDto)
      .where(eq(schema.user.id, id));
  }

  deleteUser(id: number) {
    return this.db.delete(schema.user).where(eq(schema.user.id, id));
  }
}
