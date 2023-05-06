import { Request, Response } from 'express'
import { createRestaurantInDb } from '../../../services/database/RestaurantTableUtils'

type Restaurant = {
  address: string
  image: string
  name: string
  numberOfStar: number
}

export const createRestaurant = async (req: Request, res: Response) => {
  const { address, image, name, numberOfStar } = req.body

  const data = { address, image, name, numberOfStar }

  const restaurant = await createRestaurantInDb(data)

  if (restaurant) {
    return res.status(201).send({ restaurant })
  }

  return res.status(400).send({ message: 'error' })
}
