import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http";
import axios from 'axios'

// padrão de projeto ADAPTER
// a ideia é adaptar duas interfaces diferentes
// 1 interface - nossa interface HttpPostClient: que definimos um formato => post (params: HttpPostParams<T>: Promise<HttpResponse<R>>)
// 2 interface - a outra interfaec é o axios
// o axios não depende do nosso sistema e nem nosso sistema depende do axios
// assim, nossos casos de uso não dependem mais do axios, sequisermos trocar o axios podemos fazer sem problemas, basta reimplementar esta classe e seus testes
export class AxiosHttpClient implements HttpPostClient<any, any>{
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>>{
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
