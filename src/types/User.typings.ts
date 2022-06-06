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

export interface UserGetDTO {
  id?: string,
  nick: string,
  email: string,
  page?: number,
  perPage?: number
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

export interface UserDeleteDTO {
  id: string,
  email?: string,
  password?: string
}

interface UserAddressDTO {
  streetNumber?: number,
  zipCode?: string,
}

