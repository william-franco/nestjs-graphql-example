import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskRepository: TaskRepository) { }

  @Mutation(() => Task)
  createTask(@Args('input') input: CreateTaskInput) {
    return this.taskRepository.create(input);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.taskRepository.findAll();
  }

  @Query(() => [Task], { name: 'tasksByUser' })
  findByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.taskRepository.findByUser(userId);
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskRepository.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('input') input: UpdateTaskInput) {
    return this.taskRepository.update(input.id, input);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskRepository.remove(id);
  }

  @Mutation(() => Boolean)
  async removeAllTasks() {
    await this.taskRepository.removeAll();
    return true;
  }
}
