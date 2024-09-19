import { Module } from '@nestjs/common';
import { User } from './infrastructure/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastructure/controller/user.controller';
import { GetByIdUserUseCase } from './application/use-case/get-by-id-user.use-case';
import { CreateUserUseCase } from './application/use-case/create-user.use-case';
import { UserRepository } from './domain/repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetByIdUserUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
