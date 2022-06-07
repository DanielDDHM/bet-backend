import { GetAllPaginate, Verify } from "./default.typings"

export interface UserCreateDTO {
  name: string,
  nick: string,
  phone: string,
  email: string,
  address: UserAddressDTO,
  password: string,
  photo?: string,
  isActive?: boolean,
  isConfirmed?: boolean,
  isStaff?: boolean,
}

export interface UserGetDTO extends GetAllPaginate {
  id?: string,
  nick?: string,
  email?: string,
  role?: string
}

export interface UserUpdateDTO {
  id: string,
  nick?: string,
  phone?: string,
  email?: string,
  password?: string,
  address?: any,
  photo?: string,
  addressId?: string,
  isActive?: boolean,
  isConfirmed?: boolean,
  isStaff?: boolean
}

export interface UserDeleteDTO extends Verify {
  id: string,
  email?: string,
  password?: string
}

interface UserAddressDTO {
  streetNumber?: number,
  zipCode?: string,
}

