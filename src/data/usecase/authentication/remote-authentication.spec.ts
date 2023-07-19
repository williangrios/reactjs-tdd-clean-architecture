import { RemoteAuthentication } from "@/data/usecase/authentication/remote-authentication"
import { HttpPostClientSpy } from "@/data/test"
import { HttpStatusCode } from "@/data/protocols/http";
import { mockAccountModel, mockAuthentication } from "@/domain/test"
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";
import { AuthenticationParams } from "@/domain/usecase";
import { AccountModel } from "@/domain/models";
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes =>{
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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

  test('should throw InvalidCredentialsError error if HttpPostClient returns 401', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    //mockando, simulando um unauthorized
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    //quando vamos testar exceção com o jest, temos que chamar o método sem o await, captura como uma promise
    //depois faço o teste com a promise
    const promise = sut.auth(mockAuthentication())
    //espero que a promise seja rejeitada
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError error if HttpPostClient returns 400', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    //mockando, simulando um unexpected error
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    //quando vamos testar exceção com o jest, temos que chamar o método sem o await, captura como uma promise
    //depois faço o teste com a promise
    const promise = sut.auth(mockAuthentication())
    //espero que a promise seja rejeitada
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw Server error error if HttpPostClient returns 500', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    //mockando, simulando um server error
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    //quando vamos testar exceção com o jest, temos que chamar o método sem o await, captura como uma promise
    //depois faço o teste com a promise
    const promise = sut.auth(mockAuthentication())
    //espero que a promise seja rejeitada
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw Not Found error if HttpPostClient returns 404', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    //mockando, simulando um server error
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    //quando vamos testar exceção com o jest, temos que chamar o método sem o await, captura como uma promise
    //depois faço o teste com a promise
    const promise = sut.auth(mockAuthentication())
    //espero que a promise seja rejeitada
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const {sut, httpPostClientSpy} = makeSut()
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })

})
