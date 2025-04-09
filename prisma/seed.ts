// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // Seed some initial todos
    await prisma.todo.createMany({
        data: [
            { title: 'Task 1', completed: false },
            { title: 'Task 2', completed: true },
            { title: 'Task 3', completed: false },
        ],
    })
}

main()
    .then(() => {
        console.log('Database seeded successfully')
    })
    .catch((e) => {
        console.error('Failed to seed database:', e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
