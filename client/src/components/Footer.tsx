import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-white font-playfair font-bold text-3xl">VIZKO</span>
            </Link>
            <p className="text-gray-300 mb-6">
              Premium mattresses crafted in India and exported worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-300" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Products</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-6">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Hybrid Mattresses</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Inner Spring Mattresses</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Memory Foam Mattresses</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-300">Orthopaedic Mattresses</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-yellow-400"></i>
                <span className="text-gray-300">sales@vizkoexports.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-yellow-400"></i>
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-yellow-400"></i>
                <span className="text-gray-300">India (Manufacturing Unit)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VIZKO Global Exports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
