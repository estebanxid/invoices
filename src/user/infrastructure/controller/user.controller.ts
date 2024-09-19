import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@user/application/dto/user.dto';
import { CreateUserUseCase } from '@user/application/use-case/create-user.use-case';
import { GetByIdUserUseCase } from '@user/application/use-case/get-by-id-user.use-case';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
  ) {}

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.getByIdUserUseCase.execute(id);
  }

  @Post()
  post(@Body() user: CreateUserDto) {
    return this.createUserUseCase.execute(user);
  }
}
