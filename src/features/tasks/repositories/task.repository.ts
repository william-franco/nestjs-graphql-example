import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { CreateTaskInput } from '../dto/create-task.input';
import { UpdateTaskInput } from '../dto/update-task.input';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateTaskInput) {
    return this.prisma.task.create({ data });
  }

  findAll() {
    return this.prisma.task.findMany({ include: { user: true } });
  }

  findByUser(userId: number) {
    return this.prisma.task.findMany({ where: { userId }, include: { user: true } });
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { id }, include: { user: true } });
  }

  update(id: number, data: UpdateTaskInput) {
    return this.prisma.task.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }

  async removeAll() {
    return this.prisma.task.deleteMany();
  }
}
