import { Router } from 'express'
import { createRestaurant } from './createRestaurant'
import { getAllRestaurant } from './getAllRestaurants'

const restaurantRouters = Router()

restaurantRouters.post('/', createRestaurant)
restaurantRouters.get('/', getAllRestaurant)

export { restaurantRouters }
