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

// export interface UserUpdateDTO {

// }
// export interface UserDeleteDTO {

// }

// export interface UserPatchDTO {

// }

// export interface UserGetDTO {

// }

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

