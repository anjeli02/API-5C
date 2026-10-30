import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { CustomerAddressModule } from './customer-address/customer-address.module.js';
import { PublishersModule } from './publishers/publishers.module.js';
import { AuthorsModule } from './authors/authors.module.js';
import { BookAuthorsModule } from './book-authors/book-authors.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { OrderItemsModule } from './order-items/order-items.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ShipmentsModule } from './shipments/shipments.module.js';
import Joi from 'joi';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api-5c',
    }),
    BooksModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),

    // konfigurasi orm
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        synchronize: configService.get<string>('NODE_ENV') === 'development',
      })
    }),

    CategoriesModule,

    CustomersModule,

    CustomerAddressModule,

    PublishersModule,

    AuthorsModule,

    BookAuthorsModule,

    OrdersModule,

    OrderItemsModule,

    PaymentsModule,

    ShipmentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}