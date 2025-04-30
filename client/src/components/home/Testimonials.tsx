import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    text: "VIZKO has been our trusted mattress supplier for over 3 years. Their commitment to quality and exceptional customer service keeps us coming back.",
    name: "Maria Rodriguez",
    title: "Hotel Chain Owner, Spain",
    stars: 5
  },
  {
    id: 2,
    text: "The custom sizing options from VIZKO have been invaluable for our unique market needs. Their export process is smooth and reliable.",
    name: "Ahmed Al-Farsi",
    title: "Furniture Distributor, UAE",
    stars: 5
  },
  {
    id: 3,
    text: "We've tried many suppliers, but VIZKO's attention to detail and quality control is unmatched. Their mattresses consistently meet our high standards.",
    name: "Sarah Thompson",
    title: "Resort Manager, Australia",
    stars: 4.5
  },
  {
    id: 4,
    text: "Our luxury hotel chain exclusively uses VIZKO mattresses. The feedback from our guests has been overwhelmingly positive about the comfort and quality.",
    name: "Jean-Pierre Dubois",
    title: "Luxury Hotel Group, France",
    stars: 5
  },
  {
    id: 5,
    text: "VIZKO's memory foam mattresses have been a bestseller in our stores. The quality is consistent, and their customer support is excellent.",
    name: "Michael Chen",
    title: "Retail Chain Director, Singapore",
    stars: 5
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === Math.floor(testimonials.length/3) ? 0 : prev + 1));
  }, []);
  
  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? Math.floor(testimonials.length/3) : prev - 1));
  }, []);
  
  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <Star key={i} className="h-5 w-5 fill-current" />
        );
      } else if (i - rating === 0.5) {
        // Half star
        stars.push(
          <Star key={i} className="h-5 w-5 fill-current stroke-current" strokeWidth={1} strokeDasharray="2" />
        );
      } else {
        // Empty star
        stars.push(
          <Star key={i} className="h-5 w-5 text-gray-300" />
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 text-primary"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 text-primary"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Slides container with overflow hidden */}
          <div className="overflow-hidden">
            {/* Track that moves */}
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Group testimonials in sets of 3 (or less for the last group) */}
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.slice(slideIndex * 3, slideIndex * 3 + 3).map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card bg-gray-50 rounded-lg p-8 shadow-md relative">
                      <div className="flex items-center mb-4">
                        <div className="text-yellow-500 flex">
                          {renderStars(testimonial.stars)}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6 italic relative z-10">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center">
                        <div>
                          <h4 className="font-playfair font-bold text-primary">{testimonial.name}</h4>
                          <p className="text-gray-600 text-sm">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots for slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
