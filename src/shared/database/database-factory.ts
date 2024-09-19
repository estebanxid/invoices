import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentService } from '@shared/environment/environment-config.service';

export const DatabaseFactory = (
  config: EnvironmentService,
): TypeOrmModuleOptions =>
  ({
    type: config.geDatabaseType(),
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  } as TypeOrmModuleOptions);
