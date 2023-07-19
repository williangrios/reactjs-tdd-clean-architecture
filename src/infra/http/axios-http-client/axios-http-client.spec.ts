import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios';
import { Faker, faker } from "@faker-js/faker";
import { HttpPostParams } from "@/data/protocols/http";

// mockando a lib do axios
jest.mock('axios')
// agora esta variavel tem acesso a tudo que o axios tem
const mockedAxios = axios as jest.Mocked<typeof axios>
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    name: 'wil',
    obs: 'ok'
  }
})

describe('AxiosHttpClient', () => {

  test('Should call axios with correct values - url, verb, body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

})
