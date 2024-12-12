import Image from 'next/image'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

interface ProductCardProps {
  image: string
  title: string
  price: number
  likes: number
  comments: number
}

export default function ProductCard({ image, title, price, likes, comments }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-square">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">${price}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-red-500">
              <Heart size={20} />
              <span className="ml-1">{likes}</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              <MessageCircle size={20} />
              <span className="ml-1">{comments}</span>
            </button>
            <button className="text-gray-600 hover:text-green-500">
              <Share2 size={20} />
            </button>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

