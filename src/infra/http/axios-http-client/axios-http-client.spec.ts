import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios';
import { Faker, faker } from "@faker-js/faker";
import { HttpPostParams } from "@/data/protocols/http";

// mockando a lib do axios
jest.mock('axios')
// agora esta variavel tem acesso a tudo que o axios tem
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: {
    ok: true
  },
  status: 200
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

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

  test('Should return the correct statusCode and Body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })

})
