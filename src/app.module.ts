import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './common/prisma.service';
import { UserResolver } from './features/users/controllers/user.resolver';
import { UserRepository } from './features/users/repositories/user.repository';
import { TaskResolver } from './features/tasks/controllers/task.resolver';
import { TaskRepository } from './features/tasks/repositories/task.repository';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    PrismaService,
    UserResolver,
    UserRepository,
    TaskResolver,
    TaskRepository
  ],
})
export class AppModule {}