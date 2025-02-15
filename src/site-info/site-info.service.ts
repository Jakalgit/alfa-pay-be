import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CurrencySolution } from "./models/currency-solution.model";
import { Country } from "./models/country.model";
import { Contact } from "./models/contacts.model";

@Injectable()
export class SiteInfoService implements OnModuleInit {

  constructor(
    @InjectModel(CurrencySolution)
    private readonly currencySolutionRepository: typeof CurrencySolution,
    @InjectModel(Country)
    private readonly countryRepository: typeof Country,
    @InjectModel(Contact)
    private readonly contactRepository: typeof Contact,
  )
  {}

  async onModuleInit(): Promise<void> {
    const candidate = await this.contactRepository.findOne();

    if (!candidate) {
      await this.contactRepository.create({
        address: '',
        telegramAccount: '',
        contactEmail: '',
      });
    }
  }

  async getInfo() {
    const [currencySolutions, countries, contacts] = await Promise.all([
      await this.currencySolutionRepository.findAll({
        raw: true,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      }),
      await this.countryRepository.findAll({ raw: true }),
      await this.contactRepository.findOne({ raw: true }),
    ]);

    return {
      currencySolutions,
      countries: countries.map(el => el.isoCode),
      contacts: {
        telegramAccount: contacts?.telegramAccount,
        contactEmail: contacts?.contactEmail,
        address: contacts?.address,
      }
    }
  }
}
