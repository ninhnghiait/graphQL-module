/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
import {
	Entity,
	ObjectIdColumn,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
	BeforeRemove
} from 'typeorm'
import {
	IsString,
	IsNotEmpty,
	Length,
	MinLength,
	IsEmail,
	IsBoolean
} from 'class-validator'

@Entity()
export class User {
	@ObjectIdColumn()
	_id: string

	@Column()
	@IsString()
	@IsNotEmpty()
	category-name: string

	@Column()
	@IsString()
	parent: string

	@Column()
	@IsString()
	description: string

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string
	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: string

	@OneToMany(type => User, user => user._id)
    parent: User[];
    // https://github.com/typeorm/typeorm/blob/master/docs/many-to-one-one-to-many-relations.md

	@BeforeInsert()
	async b4register() {
		this._id = await uuid.v1()
		this.role = await 'MEMBER'
		this.status = await true
		this.password = await bcrypt.hash(this.password, 10)
	}

	@BeforeUpdate()
	async b4update() {
		this.password = await bcrypt.hash(this.password, 10)
	}

	@BeforeRemove()
	async b4block() {
		this.status = false
	}

	async matchesPassword(password) {
		return await bcrypt.compare(password, this.password)
	}
}
