import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const socialMediaLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-6">
          {/* Logo */}
          <div className="flex-shrink-0 w-1/4">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-playfair font-bold text-3xl">VIZKO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center flex-grow">
            <div className="flex space-x-10">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Products", path: "/products" },
                { label: "Packaging", path: "/packaging" },
                { label: "Contact", path: "/contact" }
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`relative group font-medium py-1 ${
                    isActive(link.path) ? "text-primary" : "text-gray-800"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
            {socialMediaLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button 
              onClick={toggleMenu} 
              className="text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Products", path: "/products" },
              { label: "Packaging", path: "/packaging" },
              { label: "Contact", path: "/contact" }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={closeMenu}
                className={`relative group block py-2 font-medium ${
                  isActive(link.path) ? "text-primary" : "text-gray-800"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Mobile Social Links */}
            <div className="flex mt-4 space-x-4 border-t pt-4">
              {socialMediaLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
