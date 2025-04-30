import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Mail, MessageCircle } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  // Function to open Gmail
  const handleEmailClick = () => {
    window.open("mailto:info@vizko.com", "_blank");
  };

  // Function to open WhatsApp
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/9112345678", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />

      {/* Floating action buttons */}
      <div className="fixed right-5 bottom-24 z-50 flex flex-col gap-3">
        {/* Gmail button */}
        <button 
          onClick={handleEmailClick}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Email us"
        >
          <Mail className="h-6 w-6" />
        </button>
        
        {/* WhatsApp button */}
        <button 
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
