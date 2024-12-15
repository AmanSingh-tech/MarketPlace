import Image from 'next/image'

interface PostCardProps {
  title: string
  description: string
  image: string
  price: string
  bidEndDate: string
}

export default function PostCard({ title, description, image, price, bidEndDate }: PostCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative aspect-square">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 mb-2">{description}</p>

        {/* Price */}
        <p className="text-gray-600 mb-2 font-bold">Price: ${price}</p>

        {/* Bid End Date */}
        <p className="text-gray-500 mb-4 text-sm">Bid Ends: {new Date(bidEndDate).toLocaleDateString()}</p>

        {/* Actions */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full">
          Place Bid
        </button>
      </div>
    </div>
  )
}
