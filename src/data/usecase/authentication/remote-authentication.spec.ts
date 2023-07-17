import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { mockAuthentication } from "@/domain/test/mock-authentication"
import { faker } from '@faker-js/faker';


type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes =>{
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const {sut, httpPostClientSpy} = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    //toEqual compara objetos
    //se colocássemos o toBe, estariamos comparando os ponteiros do objeto (nunca vai dar certo)
    expect(httpPostClientSpy.body).toEqual(authParams)
  })
})
