import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface CurrencySolutionCreationAttrs {
  currency: string;
  tariff: string;
  minMaxPayIn: string;
  minMaxPayOut: string;
  trafficType: string;
  settlementUSDT: string;
  settlementPeriod: string;
  methods: string;
}

@Table({ tableName: 'currency_solutions' })
export class CurrencySolution extends Model<CurrencySolution, CurrencySolutionCreationAttrs> {

  @Column({ type: DataType.STRING, unique: true })
  currency: string;

  @Column({ type: DataType.STRING })
  tariff: string;

  @Column({ type: DataType.STRING })
  minMaxPayIn: string;

  @Column({ type: DataType.STRING })
  minMaxPayOut: string;

  @Column({ type: DataType.STRING })
  trafficType: string;

  @Column({ type: DataType.STRING })
  settlementUSDT: string;

  @Column({ type: DataType.STRING })
  settlementPeriod: string;

  @Column({ type: DataType.STRING })
  methods: string;
}