import {
    Resolver,
    Query,
    Mutation,
    Args,
    Context
} from '@nestjs/graphql';
import {UserService} from './user.service';
import {
    User,
    CreateUserInput,
    LoginResponse,
    LoginUserInput
} from './user.entity';
import {UpdateUserInput} from '../../graphql';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {
    }

    @Query(() => User)
    async me(@Context('currentUser') currentUser: User) {
        return await currentUser;
    }

    @Query(() => [User])
    async users(@Args('offset') offset: number, @Args('limit') limit: number) {
        return this.userService.findAll(offset, limit);
    }

    @Query(() => User)
    async user(@Args('_id') _id: string) {
        return this.userService.findById(_id);
    }

    @Mutation(() => User)
    async createUser(
        @Args('input') input: CreateUserInput
    ) {
        const createdUser = await this.userService.create(input);
        return createdUser;
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Args('_id') _id: string,
        @Args('input') input: UpdateUserInput
    ) {
        return await this.userService.update(_id, input);
    }

    @Mutation(() => Boolean)
    async deleteUser(@Args('_id') _id: string) {
        return await this.userService.delete(_id);
    }

    @Mutation(() => Boolean)
    async deleteUsers() {
        return await this.userService.deleteAll();
    }

    @Mutation(() => LoginResponse)
    async login(@Args('input') input: LoginUserInput) {
        return await this.userService.login(input);
    }

    @Mutation(() => Boolean)
    async setRole(@Args('_id') _id: string, @Args('role') role: string) {
        return await this.userService.setRole(_id, role);
    }

}
