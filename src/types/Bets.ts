import UserInterface from "./User"

export default interface BetsInterface {
  details: JSON,
  value: string,
  winner: boolean,
  better: UserInterface,
  dateBet: Date,
  createdAt: Date,
  updatedAt: Date
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean
}
