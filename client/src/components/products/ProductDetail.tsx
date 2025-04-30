import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ProductType } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductDetailProps {
  product: ProductType;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // State for selected dimensions and thickness
  const [selectedLength, setSelectedLength] = useState<number | null>(null);
  const [selectedBreadth, setSelectedBreadth] = useState<number | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);

  // Get unique lengths and breadths from the product pricing
  const availableLengths = product.pricing
    .map(item => item.length)
    .filter((value, index, self) => self.indexOf(value) === index);
    
  const availableBreadths = selectedLength 
    ? product.pricing
        .filter(item => item.length === selectedLength)
        .map(item => item.breadth)
        .filter((value, index, self) => self.indexOf(value) === index)
    : [];

  // Calculate price based on selections
  const getPrice = () => {
    if (!selectedLength || !selectedBreadth || !selectedThickness) return null;
    
    const pricingItem = product.pricing.find(
      item => item.length === selectedLength && item.breadth === selectedBreadth
    );
    
    if (!pricingItem) return null;
    
    const thicknessIndex = product.thicknesses.findIndex(t => t === selectedThickness);
    return thicknessIndex !== -1 ? pricingItem.prices[thicknessIndex] : null;
  };

  const price = getPrice();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={product.image} 
            alt={`${product.name} Mattress`} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-8">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-4">{product.name} Mattress</h2>
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-8">
            <h3 className="font-playfair text-xl font-bold text-primary mb-4">Configure Your Mattress</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Length Selection */}
              <div className={`p-4 border rounded-lg transition-all duration-300 ${selectedLength ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200'}`}>
                <Label htmlFor="length" className="block mb-2 font-medium text-primary">Length (Inch)</Label>
                <Select 
                  onValueChange={(value) => {
                    setSelectedLength(Number(value));
                    setSelectedBreadth(null); // Reset breadth when length changes
                    setSelectedThickness(null); // Reset thickness when length changes
                  }}
                >
                  <SelectTrigger id="length" className={`w-full ${selectedLength ? 'border-primary' : ''}`}>
                    <SelectValue placeholder="Select Length" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLengths.map(length => (
                      <SelectItem key={length} value={length.toString()}>
                        {length}"
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Breadth Selection */}
              <div className={`p-4 border rounded-lg transition-all duration-300 ${selectedBreadth ? 'border-primary bg-primary/5 shadow-md' : selectedLength ? 'border-gray-300' : 'border-gray-200 opacity-70'}`}>
                <Label htmlFor="breadth" className="block mb-2 font-medium text-primary">Breadth (Inch)</Label>
                <Select 
                  onValueChange={(value) => {
                    setSelectedBreadth(Number(value));
                    setSelectedThickness(null); // Reset thickness when breadth changes
                  }}
                  disabled={!selectedLength}
                >
                  <SelectTrigger id="breadth" className={`w-full ${selectedBreadth ? 'border-primary' : ''}`}>
                    <SelectValue placeholder={selectedLength ? "Select Breadth" : "Select Length first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBreadths.map(breadth => (
                      <SelectItem key={breadth} value={breadth.toString()}>
                        {breadth}"
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Thickness Selection */}
              <div className={`p-4 border rounded-lg transition-all duration-300 ${selectedThickness ? 'border-primary bg-primary/5 shadow-md' : selectedBreadth ? 'border-gray-300' : 'border-gray-200 opacity-70'}`}>
                <Label htmlFor="thickness" className="block mb-2 font-medium text-primary">Thickness (Inch)</Label>
                <Select 
                  onValueChange={(value) => setSelectedThickness(value)}
                  disabled={!selectedBreadth}
                >
                  <SelectTrigger id="thickness" className={`w-full ${selectedThickness ? 'border-primary' : ''}`}>
                    <SelectValue placeholder={selectedBreadth ? "Select Thickness" : "Select Breadth first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {product.thicknesses.map(thickness => (
                      <SelectItem key={thickness} value={thickness}>
                        {thickness}"
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Price Display */}
            {price !== null ? (
              <div className="bg-gradient-to-r from-primary/10 to-accent p-6 rounded-lg mt-6 border border-primary/20 shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-gray-700 text-sm">Your Selected Configuration</p>
                    <p className="font-medium text-primary">
                      {selectedLength}" × {selectedBreadth}" × {selectedThickness}" {product.name} Mattress
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 text-sm">Price</p>
                    <p className="text-primary text-3xl font-bold">₹{price.toLocaleString()}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href={`/contact?product=${product.id}&length=${selectedLength}&breadth=${selectedBreadth}&thickness=${selectedThickness}`}
                      className="bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300 inline-flex items-center"
                    >
                      Enquire Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 p-6 rounded-lg text-center mt-6 bg-gray-50">
                <p className="text-gray-500">Select dimensions and thickness to see price</p>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="font-playfair text-lg font-bold text-primary mb-4">Full Pricing Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Length (in)
                    </th>
                    <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Breadth (in)
                    </th>
                    {product.thicknesses.map((thickness) => (
                      <th key={thickness} className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {thickness}" Price (₹)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.pricing.map((price, index) => (
                    <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b border-gray-200">{price.length}</td>
                      <td className="px-4 py-3 border-b border-gray-200">{price.breadth}</td>
                      {price.prices.map((p, i) => (
                        <td key={i} className="px-4 py-3 border-b border-gray-200">{p.toLocaleString()}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-primary mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Prices exclude 18% GST</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>LUT exempt GST available</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Mattresses are roll-packed in rexine</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>Bulk order discounts available for export orders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
