export interface GetAddressDTO {
  zipCode: string,
  streetNumber: number
}

export interface CreateAddressDTO {
  zipCode: string,
  streetNumber: number,
  street: string,
  neighborhood: string,
  city: string,
  state: string
}
