import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@user/domain/repository/user.repository';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  post(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
