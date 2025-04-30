import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EnhancedProductType } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFilterProps {
  products: EnhancedProductType[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  lengthRange: [number, number];
  breadthRange: [number, number];
  heightRange: [number, number];
  priceRange: [number, number];
}

export default function ProductFilter({ products, onFilterChange }: ProductFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Calculate min and max values from the product data
  const allLengths = products.map(p => p.length);
  const minLength = Math.min(...allLengths);
  const maxLength = Math.max(...allLengths);
  
  const allBreadths = products.map(p => p.breadth);
  const minBreadth = Math.min(...allBreadths);
  const maxBreadth = Math.max(...allBreadths);
  
  const allHeights = products.map(p => p.height);
  const minHeight = Math.min(...allHeights);
  const maxHeight = Math.max(...allHeights);
  
  const allPrices = products.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  
  // Get unique categories
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    categories: uniqueCategories,
    lengthRange: [minLength, maxLength],
    breadthRange: [minBreadth, maxBreadth],
    heightRange: [minHeight, maxHeight],
    priceRange: [minPrice, maxPrice],
  });
  
  // Dropdown options
  const lengthOptions = [72, 78];
  const breadthOptions = [36, 48, 60, 72];
  const heightOptions = [4, 6, 8];
  
  // Category filter controls
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== category),
      });
    }
  };
  
  // Length dropdown handlers
  const handleMinLengthChange = (value: string) => {
    const numValue = Number(value);
    if (numValue <= filters.lengthRange[1]) {
      setFilters({...filters, lengthRange: [numValue, filters.lengthRange[1]]});
    }
  };
  
  const handleMaxLengthChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= filters.lengthRange[0]) {
      setFilters({...filters, lengthRange: [filters.lengthRange[0], numValue]});
    }
  };
  
  // Breadth dropdown handlers
  const handleMinBreadthChange = (value: string) => {
    const numValue = Number(value);
    if (numValue <= filters.breadthRange[1]) {
      setFilters({...filters, breadthRange: [numValue, filters.breadthRange[1]]});
    }
  };
  
  const handleMaxBreadthChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= filters.breadthRange[0]) {
      setFilters({...filters, breadthRange: [filters.breadthRange[0], numValue]});
    }
  };
  
  // Height dropdown handlers
  const handleMinHeightChange = (value: string) => {
    const numValue = Number(value);
    if (numValue <= filters.heightRange[1]) {
      setFilters({...filters, heightRange: [numValue, filters.heightRange[1]]});
    }
  };
  
  const handleMaxHeightChange = (value: string) => {
    const numValue = Number(value);
    if (numValue >= filters.heightRange[0]) {
      setFilters({...filters, heightRange: [filters.heightRange[0], numValue]});
    }
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      categories: uniqueCategories,
      lengthRange: [minLength, maxLength],
      breadthRange: [minBreadth, maxBreadth],
      heightRange: [minHeight, maxHeight],
      priceRange: [minPrice, maxPrice],
    });
  };
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-lg border border-gray-200 shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="text-xs text-gray-500 hover:text-primary"
          >
            Reset All
          </Button>
        </div>
        
        {/* Categories filter */}
        <div className="mb-6">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {uniqueCategories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm font-normal capitalize">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Length filter with dropdowns */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium text-gray-700">Length (inches)</Label>
          </div>
          <div className="w-full">
            <Select 
              value={filters.lengthRange[0].toString()} 
              onValueChange={handleMinLengthChange}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select Length" />
              </SelectTrigger>
              <SelectContent>
                {lengthOptions.map(length => (
                  <SelectItem key={`length-${length}`} value={length.toString()}>
                    {length}"
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Breadth filter with dropdowns */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium text-gray-700">Breadth (inches)</Label>
          </div>
          <div className="w-full">
            <Select 
              value={filters.breadthRange[0].toString()} 
              onValueChange={handleMinBreadthChange}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select Breadth" />
              </SelectTrigger>
              <SelectContent>
                {breadthOptions.map(breadth => (
                  <SelectItem key={`breadth-${breadth}`} value={breadth.toString()}>
                    {breadth}"
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Height/Thickness filter with dropdowns */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium text-gray-700">Thickness (inches)</Label>
          </div>
          <div className="w-full">
            <Select 
              value={filters.heightRange[0].toString()} 
              onValueChange={handleMinHeightChange}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select Thickness" />
              </SelectTrigger>
              <SelectContent>
                {heightOptions.map(height => (
                  <SelectItem key={`height-${height}`} value={height.toString()}>
                    {height}"
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Price slider */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium text-gray-700">Price Range (₹)</Label>
            <div className="text-xs text-gray-500">
              ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
            </div>
          </div>
          <Slider 
            defaultValue={[minPrice, maxPrice]} 
            min={minPrice} 
            max={maxPrice}
            step={100}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={(value) => setFilters({...filters, priceRange: [value[0], value[1]]})}
            className="my-4"
          />
          <div className="flex gap-2">
            <div className="w-1/2">
              <Input 
                type="number" 
                min={minPrice} 
                max={filters.priceRange[1]} 
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= minPrice && value <= filters.priceRange[1]) {
                    setFilters({...filters, priceRange: [value, filters.priceRange[1]]});
                  }
                }}
                className="h-8 text-xs"
              />
            </div>
            <div className="w-1/2">
              <Input 
                type="number" 
                min={filters.priceRange[0]} 
                max={maxPrice} 
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= filters.priceRange[0] && value <= maxPrice) {
                    setFilters({...filters, priceRange: [filters.priceRange[0], value]});
                  }
                }}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}