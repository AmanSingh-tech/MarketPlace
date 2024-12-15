'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import BidMenu from '@/components/bidMenu'
import { Product } from '@/utils/formValue'


interface ProductGridProps {
    ongoingProducts: Product[];
    previousProducts: Product[];
}

export default function ProductGrid({ ongoingProducts, previousProducts }: ProductGridProps) {
    const [category, setCategory] = useState('ongoing')

    const productsToDisplay = category === 'ongoing' ? ongoingProducts : previousProducts

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar for Category Selection */}
            <aside className="md:w-1/4">
                <BidMenu onCategoryChange={setCategory} />
            </aside>

            {/* Product Grid */}
            <main className="md:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {productsToDisplay.map((product) => (
                        <ProductCard
                            product={product}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
