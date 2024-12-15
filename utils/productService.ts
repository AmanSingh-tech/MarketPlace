// utils/productService.ts
import { db } from '@/utils/db'

export async function getProducts() {
    const currentDate = new Date().toISOString()
    const ongoingProducts = await db.post.findMany({
        where: {
            bidEndDate: {
                gte: currentDate, // Active bids (not expired)
            },
        },
    })

    const previousProducts = await db.post.findMany({
        where: {
            bidEndDate: {
                lt: currentDate, // Expired bids
            },
        },
    })

    return { ongoingProducts, previousProducts }
}
