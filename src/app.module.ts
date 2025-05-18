import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GeneratorModule } from './modules/genrator/generator.module';
import { ScannerModule } from './modules/scanner/scanner.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
       throttlers: [
        {
          ttl: 60000,
          limit: 10000,
        },
      ],
    }),
    GeneratorModule,
    ScannerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}