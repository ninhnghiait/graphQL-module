import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	Category,
	CreateCategoryInput,
	LoginResponse,
	LoginCategoryInput
} from './category.entity';
import { MongoRepository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-core';
import { UpdateCategoryInput } from '../../graphql';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: MongoRepository<Category>
	) {}

	async findAll(offset: number, limit: number): Promise<Category[]> {
		return await this.categoryRepository.find({
			order: { createdAt: 'DESC' },
			skip: offset,
			take: limit,
			cache: true
		});
	}

	async findById(_id: string): Promise<Category> {
		return await this.categoryRepository.findOne({ _id });
	}

	async create(input: CreateCategoryInput): Promise<Category> {
		const { categoryname, parent, description } = input;

		const category = new Category();
		category.categoryname = categoryname;
		category.parent = parent;
		category.description = description;
		return await this.categoryRepository.save(category);
	}

	async update(_id: string, input: UpdateCategoryInput): Promise<boolean> {
		const { categoryname, password, email } = input;

		const category = await this.categoryRepository.findOne({ _id });
		category.categoryname = categoryname;
		category.password = password;
		category.email = email;

		return (await this.categoryRepository.save(category)) ? true : false;
	}

	async delete(_id: string): Promise<boolean> {
		const category = new Category();
		category._id = _id;
		return (await this.categoryRepository.remove(category)) ? true : false;
	}

	async deleteAll(): Promise<boolean> {
		return (await this.categoryRepository.deleteMany({})) ? true : false;
	}

}
