import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory =
      await this.categoriesRepository.findByNameAndUserId(
        createCategoryDto.categoryName,
        createCategoryDto.userId,
      );
    if (existingCategory) {
      throw new ForbiddenException(
        'Category name already exists for this user',
      );
    }
    return this.categoriesRepository.create(createCategoryDto);
  }

  async findAll(userId: number) {
    return this.categoriesRepository.findAll(userId);
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category._count.transactions > 0) {
      throw new ForbiddenException(
        'Cannot delete category with associated transactions',
      );
    }
    return this.categoriesRepository.delete(id);
  }
}
