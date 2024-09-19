import { Inject, Injectable } from '@nestjs/common';
import { User } from '@user/domain/model/user.model';
import { UserRepository } from '@user/domain/repository/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  execute(user: User) {
    return this.userRepository.post(user);
  }
}
