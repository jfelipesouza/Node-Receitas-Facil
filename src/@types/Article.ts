import { ImageDto } from './Image'

export type ArticlesPagination = {
  initialElement: number
  lastElement: number
}
export type ArticleContent = [
  {
    subTitle: string
    paragraph: string
    image?: ImageDto
  }
]
export type ICreateArticle = {
  title: string
  content: ArticleContent
}

export type ArticleResposeDTO = ICreateArticle & ArticleDTO

export type ArticleDTO = { id: string; author: string; banner: ImageDto }