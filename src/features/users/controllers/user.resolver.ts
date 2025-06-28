import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserRepository } from '../repositories/user.repository';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly repository: UserRepository) { }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.repository.create(input);
  }

  @Query(() => [User])
  users() {
    return this.repository.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.repository.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.repository.update(input.id, input);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.repository.remove(id);
  }

  @Mutation(() => Boolean)
  async removeAllUsers() {
    await this.repository.removeAll();
    return true;
  }
}
