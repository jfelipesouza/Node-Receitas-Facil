import { PrismaClient } from '@prisma/client'

// Contants connection in database
const prismaClientDatabase = new PrismaClient()

export { prismaClientDatabase }
