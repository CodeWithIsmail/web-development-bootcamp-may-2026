import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateCategoryDto) {
    return this.db.category.create({ data });
  }

  async findAll(userId: number) {
    return this.db.category.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    return this.db.category.findUnique({
      where: { id },
      include: { _count: { select: { transactions: true } } },
    });
  }

  async findByNameAndUserId(categoryName: string, userId: number) {
    return this.db.category.findUnique({
      where: {
        unique_category_per_user: {
          categoryName,
          userId,
        },
      },
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    return this.db.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.db.category.delete({
      where: { id },
    });
  }
}
