import { Request, Response } from 'express'
import { getAllRestaurantInDB } from '../../../services/database/RestaurantTableUtils'

const getAllRestaurant = async (req: Request, res: Response) => {
  const restaurants = await getAllRestaurantInDB()

  return res.status(200).send({ restaurants })
}

export { getAllRestaurant }
