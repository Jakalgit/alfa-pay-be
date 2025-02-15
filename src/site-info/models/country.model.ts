import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface CountryCreationAttrs {
  isoCode: string;
}

@Table({ tableName: 'countries' })
export class Country extends Model<Country, CountryCreationAttrs> {

  @Column({ type: DataType.STRING, unique: true })
  isoCode: string;
}