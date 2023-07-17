import { HttpResponse } from '@/data/protocols/http/http-response'

export type HttpPostParams = {
  url: string
  body?: object
}

// o data layer esta entre o Domain e o Infra
// ou seja, a resposta que voltar da API retorna com algum status e resposta no body
// não podemos retornar para a camada de UI um erro de HTTP, porque nossa camada de presentation do UI só conhecem
// sobre o dominio da aplicação, e o nosso dominio é desacoplado de acesso à api.
// ou seja, nossa camada de datalayer vai ser um mediador entre o http e o dominio
// ou seja, vamos ter que criar alguns erros dentro do dominio (ex: erro 400, 401, tratando o que queremos enviar para o UI)
// por isso vamos colocar uma resposta aqui (Httpresponse)

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
