import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  done: boolean;

  @Field(() => Int)
  userId: number;
}