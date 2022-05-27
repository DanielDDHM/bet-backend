import { DefaultSchema } from './default.typings';

export interface UserCreateDTO extends DefaultSchema {
  name: string,
  nick: string,
  contact: UserContactDTO,
  email: string,
  address: UserAddressDTO,
  password: string,
  photo: string,
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean,
}

//TODO: terminar tipagens
export interface UserUpdateDTO {
  nick: string,
  email: string,
  password: string
}
export interface UserDeleteDTO {
  email: string,
}

export interface UserPatchDTO {
  email: string,
}

export interface UserGetDTO {
  id?: string,
  nick: string,
  email: string,
}

interface UserContactDTO {
  id?: any,
  phone: string,
  email: string,
}

interface UserAddressDTO {
  id?: any,
  streetNumber: number,
  zipCode: string,
  street: string,
  neighboorhood: string,
  city: string,
  state: string,
}

