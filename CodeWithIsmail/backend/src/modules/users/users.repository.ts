import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateUserDto) {
    const { userName, hashedPassword } = data;
    return this.db.user.create({
      data: {
        userName,
        hashedPassword,
      },
    });
  }

  async findAll() {
    return this.db.user.findMany();
  }

  async findById(id: number) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async findByUserName(userName: string) {
    return this.db.user.findUnique({
      where: { userName },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await this.db.user.delete({
      where: { id },
    });
  }
}
