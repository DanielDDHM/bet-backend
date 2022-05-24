import BetsInterface from "./Bets"

export default interface UserInterface {
  name: string,
  email: string,
  contact: JSON,
  password: string,
  photo: string,
  bets: BetsInterface,
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean,
  createdAt: Date,
  updatedAt: Date
}
