import { DefaultSchema } from './default.typings';

export interface UserInterface extends DefaultSchema {
  name: string,
  nick: string,
  contact: UserContact,
  email: string,
  address: UserAddress,
  password: string,
  photo: string,
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean,
}

interface UserContact {
  id?: any,
  phone: string,
  email: string,
}

interface UserAddress {
  id?: any,
  streetNumber: number,
  zipCode: string,
  street: string,
  neighboorhood: string,
  city: string,
  state: string,
}

export type UserParam = Omit<UserInterface,
  'id' |
  'createdAt' |
  'updatedAt' |
  'deleted' |
  'deletedAt'
>;
