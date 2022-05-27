import { BetsCreateDTO, BetsDeleteDTO, BetsGetDTO, BetsPatchDTO, BetsUpdateDTO } from "../types"

// TODO: Terminar bets services
export default class BetsService {
  params: BetsCreateDTO | BetsUpdateDTO
  constructor(params: BetsCreateDTO | BetsUpdateDTO) {
    this.params = params
  }
  async create(params = this.params) {
    console.log('create')
  }

  async update(params = this.params) {
    console.log('update')
  }

  async patch(params = this.params) {
    console.log('patch')
  }

  async delete(params = this.params) {
    console.log('delete')
  }

  async get(params = this.params) {
    console.log('get')
  }
}
