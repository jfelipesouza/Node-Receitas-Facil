import { ArticlesPagination } from '../../../@types/Article'
import { prismaClientDatabase } from '../prisma'

const getAllArticles = async ({
  initialElement,
  lastElement
}: ArticlesPagination) => {
  try {
    const [articlesFind, total] = await prismaClientDatabase.$transaction([
      prismaClientDatabase.article.findMany({
        skip: initialElement,
        take: lastElement
      }),
      prismaClientDatabase.article.count()
    ])

    return { total, articlesFind }
  } catch (error) {
    console.log(error)
  }
}

export { getAllArticles }
