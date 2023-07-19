import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios';
import { Faker, faker } from "@faker-js/faker";

// mockando a lib do axios
jest.mock('axios')
// agora esta variavel tem acesso a tudo que o axios tem
const mockedAxios = axios as jest.Mocked<typeof axios>
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url', async () => {

    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({
      url
    })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
