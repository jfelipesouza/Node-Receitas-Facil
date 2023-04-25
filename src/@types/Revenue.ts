export type RevenueMinimun = {
  id: string
  image: {
    base64: string
    mimeType: string
  }
  foodName: string
}

export type CreateRevenue = {
  foodName: string
  foodDescription: string
  ingredients: {
    count: number
    name: string
  }
  preparation: string[]
  calories: string
  portions: number
  preparationTime: number
  image: {
    id: string
  }
  profile: {
    id: string
  }
  category: string
}
