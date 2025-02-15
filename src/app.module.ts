import { Module } from '@nestjs/common';
import { SiteInfoModule } from './site-info/site-info.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import { RequestModule } from './request/request.module';
import * as path from "path"
import pg from "pg";
import { Contact } from "./site-info/models/contacts.model";
import { Country } from "./site-info/models/country.model";
import { CurrencySolution } from "./site-info/models/currency-solution.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [path.join(__dirname, '../.env')],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        dialectModule: pg,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [Contact, Country, CurrencySolution],
        autoLoadModels: true,
      }),
    }),
    SiteInfoModule,
    AuthModule,
    RequestModule
  ],
})
export class AppModule {}
