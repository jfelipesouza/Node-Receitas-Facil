import { ImageDto } from './Image'

export type ArticlesPagination = {
  initialElement: number
  lastElement: number
}

export type ArticleContent = [
  {
    subTitle: string
    paragraph: string
  }
]
export type ICreateArticle = {
  title: string
  content: ArticleContent
  authorID: string
}

export type ArticleResposeDTO = ICreateArticle & ArticleDTO

export type ArticleDTO = { id: string; authorID: string; images?: ImageDto[] }
