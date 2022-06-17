import { prisma } from "../../config"
import { UserService } from "../../services";
import { Generator } from '../../helpers'

describe('[USER DELETE]', () => {
  afterAll(async () => {
    const data = {
      name: "confuso",
      nick: new Generator('').makeid(),
      email: new Generator('').makeid() + "@teste.com.br",
      password: "teste",
      phone: "71996421369",
      addressId: '62ac9e9f617b009386afc55d'
    }
    await prisma.users.create({ data })
  });

  it('DELETE USER WITH SUCCESS', async () => {

    const user = await prisma.users.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    const userDel = await new UserService({ id: user?.id, role: 'ADMIN' }).delete()
    expect(userDel).toHaveProperty("message")
  });

  it('GET GAME WITH FAIL ', async () => {
    try {
      const game = await new UserService({ id: "sdasdasd", role: 'ADMIN' }).delete()
      expect(game).toBe(Error)
    } catch (error: any) {
      expect(error)
    }
  });
})
