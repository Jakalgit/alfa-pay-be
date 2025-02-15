import { Module } from '@nestjs/common';
import { SiteInfoService } from './site-info.service';
import { SiteInfoController } from './site-info.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Contact } from "./models/contacts.model";
import { Country } from "./models/country.model";
import { CurrencySolution } from "./models/currency-solution.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Contact, Country, CurrencySolution]),
  ],
  providers: [SiteInfoService],
  controllers: [SiteInfoController]
})
export class SiteInfoModule {}
