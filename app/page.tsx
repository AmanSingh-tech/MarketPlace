import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import  { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-white">
      {
      session ? <Header></Header> :
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">MarketPlace</h1>
          <nav>
            <Link href="auth/login" className="text-black font-semibold hover:underline mr-4">
              Log In
            </Link>
            <Link href="auth/register" className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      }

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Welcome to MarketPlace</h2>
          <p className="text-xl text-gray-600 mb-8">Discover and share amazing Arts from around the world.</p>
          <div className="flex justify-center space-x-4">
            <Link href="auth/register" className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
              Get Started
            </Link>
            <Link href="auth/login" className="border border-black text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
              Log In
            </Link>
          </div>
        </section>

        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Explore Our Arts</h3>
          <p className="text-gray-600 mb-6">Browse through our curated collection of unique and innovative Arts.</p>
          <Link href="/products" className="inline-flex items-center bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
            Visit Arts Section
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">Discover</h4>
            <p className="text-gray-600">Find unique products from around the globe.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">Share</h4>
            <p className="text-gray-600">Show off your favorite finds with the community.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">Connect</h4>
            <p className="text-gray-600">Engage with other product enthusiasts.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-1 mt-6">
        <Footer></Footer>
      </footer>
    </div>
  )
}

