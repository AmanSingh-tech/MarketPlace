import ProductCard from './ProductCard'

const products = [
  { id: 1, image: '/placeholder.svg?height=300&width=300', title: 'Vintage Camera', price: 150, likes: 24, comments: 3 },
  { id: 2, image: '/placeholder.svg?height=300&width=300', title: 'Leather Backpack', price: 89, likes: 18, comments: 2 },
  { id: 3, image: '/placeholder.svg?height=300&width=300', title: 'Wireless Headphones', price: 199, likes: 32, comments: 5 },
  { id: 4, image: '/placeholder.svg?height=300&width=300', title: 'Smartwatch', price: 250, likes: 41, comments: 7 },
  { id: 5, image: '/placeholder.svg?height=300&width=300', title: 'Polaroid Camera', price: 75, likes: 15, comments: 1 },
  { id: 6, image: '/placeholder.svg?height=300&width=300', title: 'Vintage Typewriter', price: 120, likes: 28, comments: 4 },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

