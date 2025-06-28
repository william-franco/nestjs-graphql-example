import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateUserInput) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { tasks: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, include: { tasks: true } });
  }

  update(id: number, data: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async removeAll() {
    return this.prisma.user.deleteMany();
  }
}
