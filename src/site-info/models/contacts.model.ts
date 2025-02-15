import { DataType, Model, Table, Column } from "sequelize-typescript";

export interface ContactCreationAttrs {
  telegramAccount: string;
  contactEmail: string;
  address: string;
}

@Table({ tableName: 'contacts' })
export class Contact extends Model<Contact, ContactCreationAttrs> {

  @Column({ type: DataType.STRING })
  telegramAccount: string;

  @Column({ type: DataType.STRING })
  contactEmail: string;

  @Column({ type: DataType.STRING })
  address: string;

}