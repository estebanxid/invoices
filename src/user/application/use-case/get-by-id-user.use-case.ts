import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@user/domain/repository/user.repository';

@Injectable()
export class GetByIdUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  execute(userId: number) {
    return this.userRepository.getById(userId);
  }
}
