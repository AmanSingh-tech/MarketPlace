import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">MarketPlace</h2>
            <p className="text-gray-600 mb-4">Discover and share amazing products from around the world.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Electronics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Fashion</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home & Garden</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Sports & Outdoors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-gray-600" />
                <a href="mailto:info@MarketPlace.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">info@MarketPlace.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-gray-600" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © 2023 MarketPlace. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

