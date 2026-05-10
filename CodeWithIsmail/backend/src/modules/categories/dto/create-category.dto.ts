import { TransactionType } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  @IsString({ message: 'Category name must be a string' })
  categoryName: string;

  @IsNotEmpty({ message: 'Category icon is required' })
  @IsString({ message: 'Category icon must be a string' })
  categoryIcon: string;

  @IsEnum(TransactionType, {
    message: 'Type must be either INCOME or EXPENSE',
  })
  type: TransactionType;

  @IsNotEmpty({ message: 'User ID is required' })
  @IsInt({ message: 'User ID must be an integer' })
  userId: number;
}
