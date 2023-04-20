import { Request, Response, Router } from 'express'
import { getAllArticles } from '../../services/database/ArticlesTableUtils'
import { ArticlesPagination } from '../../@types/Article'

const articlesRouters = Router()

articlesRouters.get('/', async (req: Request, res: Response) => {
  const { initialElement, lastElement }: ArticlesPagination = req.body
  const articles = await getAllArticles({
    initialElement,
    lastElement
  })
  return res.send({ articles })
})

export { articlesRouters }
