import { Module, Global } from '@nestjs/common'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category.entity'

@Global()
@Module({
	imports: [TypeOrmModule.forFeature([Category])],
	providers: [CategoryResolver, CategoryService],
	exports: [CategoryService]
})
export class CategoryModule {}
