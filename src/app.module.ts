import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from '@invoice/invoice.module';
import { UserModule } from '@user/user.module';
import { EnvironmentConfigModule } from '@shared/environment/environment-config.module';
import { ConnectionDatabaseModule } from '@shared/database/database-connection.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    ConnectionDatabaseModule,
    InvoiceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
