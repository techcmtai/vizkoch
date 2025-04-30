import { useState } from "react";
import { EnhancedProductType } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, InfoIcon } from "lucide-react";

interface ProductCardProps {
  product: EnhancedProductType;
  onAddToCompare: (product: EnhancedProductType) => void;
  isInCompare: boolean;
  showCompareButton?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCompare, 
  isInCompare, 
  showCompareButton = true 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className={`w-full h-48 object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-white text-xs font-medium px-2.5 py-0.5 rounded">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-yellow-500 text-white text-xs font-medium px-2.5 py-0.5 rounded">
            {product.height}" Thick
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.title.split("\n\n")[0]}
        </h3>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Size:</span> {product.length}" × {product.breadth}"
          </div>
          <div className="text-lg font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          {product.additionalDescription}
        </div>
        
        <div className="flex flex-col xs:flex-row gap-2 mt-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full text-primary border-primary hover:bg-primary/10"
            >
              <InfoIcon size={16} className="mr-1" />
              Details
            </Button>
          </Link>
          
          {showCompareButton && (
            <Button 
              variant={isInCompare ? "default" : "outline"}
              onClick={() => onAddToCompare(product)}
              className={`w-full ${
                isInCompare 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "text-primary border-primary hover:bg-primary/10"
              }`}
              disabled={isInCompare}
            >
              {isInCompare ? (
                <>
                  <CheckCircle size={16} className="mr-1" />
                  Added
                </>
              ) : (
                "Compare"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}