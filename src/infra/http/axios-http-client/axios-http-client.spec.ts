import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios';
import { Faker, faker } from "@faker-js/faker";

// mockando a lib do axios
jest.mock('axios')
// agora esta variavel tem acesso a tudo que o axios tem
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url', async () => {
    const sut = new AxiosHttpClient()
    const url = faker.internet.url()
    await sut.post({
      url
    })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
