import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EnhancedProductType, allProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Ruler, Layers, Grid3X3 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<EnhancedProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<EnhancedProductType[]>([]);
  const [compareProducts, setCompareProducts] = useState<EnhancedProductType[]>([]);
  
  useEffect(() => {
    if (productId) {
      const foundProduct = allProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products (same category, different dimensions)
        const related = allProducts.filter(p => 
          p.category === foundProduct.category && 
          p.id !== foundProduct.id
        ).slice(0, 3);
        
        setRelatedProducts(related);
      }
    }
  }, [productId]);
  
  // Dummy function for now, we're not implementing comparison on this page
  const handleAddToCompare = () => {};
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.title.split("\n\n")[0]} | VIZKO Mattresses</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <section className="pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-6">
            <Link href="/products">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-auto object-cover rounded-md shadow-md"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h1 className="text-2xl font-bold text-primary">{product.title.split("\n\n")[0]}</h1>
                  {product.title.split("\n\n")[1] && (
                    <h2 className="text-lg text-gray-700">{product.title.split("\n\n")[1]}</h2>
                  )}
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                      <Ruler className="text-primary h-5 w-5" />
                      <div>
                        <div className="text-sm text-gray-500">Dimensions</div>
                        <div className="font-medium">{product.length}" × {product.breadth}" × {product.height}"</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                      <Layers className="text-primary h-5 w-5" />
                      <div>
                        <div className="text-sm text-gray-500">Thickness</div>
                        <div className="font-medium">{product.height}" Mattress</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Layer Composition</p>
                    <p className="font-medium">{product.additionalDescription}</p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">*Prices exclude 18% GST. LUT exempt GST available.</div>
                    </div>
                    
                    <Link href="/contact">
                      <Button className="w-full md:w-auto bg-primary hover:bg-primary/90">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Enquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Mattresses are roll-packed in rexine for safe transportation</li>
                <li>Export-grade materials meeting international standards</li>
                <li>Custom sizing available for bulk orders</li>
                <li>Vacuum-sealed packaging available upon request</li>
              </ul>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <Grid3X3 className="text-primary h-5 w-5" />
                <h3 className="text-xl font-semibold">Related Products</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    onAddToCompare={handleAddToCompare}
                    isInCompare={false}
                    showCompareButton={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}