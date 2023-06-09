import { Router } from 'express'
import { getAllRevenues } from './getAllRevenue'
import { createRevenue } from './createRevenue'
import { getRevenueByID } from './getRevenueByID'
import { deleteAllRevenuesByProfileID } from './deleteAllRevenuesByProfileID'
import { getRandomRevenue } from './getRandomRevenue'

const revenueRouters = Router()

revenueRouters.get('/', getAllRevenues)
revenueRouters.get('/random', getRandomRevenue)
revenueRouters.get('/information', getRevenueByID)

revenueRouters.post('/create', createRevenue)

revenueRouters.delete('/', deleteAllRevenuesByProfileID)

export { revenueRouters }
