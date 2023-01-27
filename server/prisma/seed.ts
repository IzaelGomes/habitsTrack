import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



async function main() {
    await prisma.habit.create({
        data: {
            title: 'beber 2L de água',
            created_at: new Date('2023-01-01 10:10:10')
        }
    })
}
 

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })