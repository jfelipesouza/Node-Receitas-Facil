import { Router } from 'express'
import { getAllRevenues } from './getAllRevenue'
import { createRevenue } from './createRevenue'
import { getRevenueByID } from './getRevenueByID'

const revenueRouters = Router()

revenueRouters.get('/', getAllRevenues)
revenueRouters.get('/information', getRevenueByID)
revenueRouters.post('/create', createRevenue)
export { revenueRouters }
