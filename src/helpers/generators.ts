export default class Generator {
  param: any

  constructor(param: any) {
    this.param = param
  }
  async numberGenerator(param = this.param) {
    // Generate a number from one to param
    return Math.floor(Math.random() * (param - 2) + 1)
  }
}
