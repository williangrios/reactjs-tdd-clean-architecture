import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

// o data layer esta entre o Domain e o Infra
// ou seja, a resposta que voltar da API retorna com algum status e resposta no body
// não podemos retornar para a camada de UI um erro de HTTP, porque nossa camada de presentation do UI só conhecem
// sobre o dominio da aplicação, e o nosso dominio é desacoplado de acesso à api.
// ou seja, nossa camada de datalayer vai ser um mediador entre o http e o dominio
// ou seja, vamos ter que criar alguns erros dentro do dominio (ex: erro 400, 401, tratando o que queremos enviar para o UI)
// por isso vamos colocar uma resposta aqui (Httpresponse)

// o T indica que a classe que for instanciar é obrigada a informar o tipo do body do parametro (T) e o tipo do body do retorno da funcao (R)
export interface HttpPostClient<T, R> {
  // repassando o tipo para o post params
  post(params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
