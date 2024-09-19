import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentConfigModule {}
