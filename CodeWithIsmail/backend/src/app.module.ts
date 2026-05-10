import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [UsersModule, DatabaseModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
