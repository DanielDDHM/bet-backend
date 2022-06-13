import { GetAllPaginate, Verify } from "./default.typings"

export interface UserCreateDTO {
  name: string,
  nick: string,
  phone: string,
  email: string,
  address: UserAddressDTO,
  password: string,
  photo?: string,
  isStaff?: boolean,
}

export interface UserGetDTO extends GetAllPaginate {
  id?: string,
  nick?: string,
  email?: string,
  role?: string
}

export interface UserUpdateDTO extends Verify {
  id: string,
  nick?: string,
  phone?: string,
  email?: string,
  password?: string,
  address?: any,
  photo?: string,
  addressId?: string,
}

export interface UserDeleteDTO extends Verify {
  id: string,
  email?: string,
  password?: string
}

export interface UserAddressDTO {
  streetNumber?: number,
  zipCode?: string,
}

