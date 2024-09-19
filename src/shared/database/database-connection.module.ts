import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '@shared/environment/environment-config.module';
import { EnvironmentService } from '@shared/environment/environment-config.service';
import { DatabaseFactory } from './database-factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentService],
      useFactory: DatabaseFactory,
    }),
  ],
})
export class ConnectionDatabaseModule {}
