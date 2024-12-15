import ProductCard from './ProductCard'
import { db } from '@/utils/db'


export default async function ProductGrid() {
    const posts = await db.post.findMany();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <ProductCard key={post.id} image={post.image} title={post.title} price={Number(post.price)} bidEndDate={post.bidEndDate} />
      ))}
    </div>
  )
}

