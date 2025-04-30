import { EnhancedProductType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { X, MoveDown, MoveUp, FileDown, Share2 } from "lucide-react";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { useToast } from "@/hooks/use-toast";

interface ProductComparisonProps {
  compareProducts: EnhancedProductType[];
  onRemoveFromCompare: (productId: string) => void;
  onClearAll: () => void;
}

export default function ProductComparison({ 
  compareProducts, 
  onRemoveFromCompare,
  onClearAll
}: ProductComparisonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const { toast } = useToast();

  if (compareProducts.length === 0) {
    return null;
  }

  // Function to generate PDF from the comparison table
  const generatePDF = async () => {
    if (compareProducts.length === 0) {
      toast({
        title: "No products to export",
        description: "Please add products to compare before exporting.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    
    try {
      // Force expanded view for capture
      setIsExpanded(true);
      
      // Create a new PDF document
      const doc = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(0, 35, 102); // Primary color in RGB
      doc.text("VIZKO Mattress Comparison", 14, 15);
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Premium Export Mattresses - Product Comparison", 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Add company logo area
      doc.setFillColor(245, 245, 220); // Beige color
      doc.rect(14, 25, 180, 10, 'F');
      doc.setTextColor(0, 35, 102);
      doc.setFontSize(14);
      doc.text("VIZKO GLOBAL EXPORTS", 105, 31, { align: 'center' });
      
      // Prepare comparison data for the table
      const tableData = [];
      
      // Add header with product info
      const header = ['Feature'];
      compareProducts.forEach(product => {
        header.push(product.title.split("\n\n")[0]);
      });
      
      // Create rows for different features
      const categoryRow = ['Category'];
      const dimensionsRow = ['Dimensions'];
      const descriptionRow = ['Description'];
      const layersRow = ['Layers'];
      const priceRow = ['Price'];
      
      compareProducts.forEach(product => {
        categoryRow.push(product.category.charAt(0).toUpperCase() + product.category.slice(1));
        dimensionsRow.push(`${product.length}" × ${product.breadth}" × ${product.height}"`);
        descriptionRow.push(product.description);
        layersRow.push(product.additionalDescription);
        priceRow.push(`₹${product.price.toLocaleString()}`);
      });
      
      tableData.push(categoryRow, dimensionsRow, descriptionRow, layersRow, priceRow);
      
      // Add the table to the PDF
      autoTable(doc, {
        head: [header],
        body: tableData,
        startY: 40,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [0, 35, 102],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: {
            fontStyle: 'bold',
            cellWidth: 30,
          },
        },
      });
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Generated on ${dateStr} - VIZKO GLOBAL EXPORTS - Premium Export Mattresses`,
          105,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
        doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 5, { align: 'center' });
      }
      
      // Save the PDF
      const pdfName = "VIZKO-Mattress-Comparison.pdf";
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Download PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = pdfName;
      link.click();
      
      toast({
        title: "PDF exported successfully",
        description: "Your comparison has been exported to PDF",
      });
      
      return {
        pdfBlob,
        pdfName
      };
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error exporting PDF",
        description: "There was a problem generating the PDF file.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Function to share PDF via WhatsApp
  const shareOnWhatsApp = async () => {
    if (compareProducts.length === 0) {
      toast({
        title: "No products to share",
        description: "Please add products to compare before sharing.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Generate PDF first
      setIsExporting(true);
      const pdfResult = await generatePDF();
      
      if (!pdfResult) return;
      
      // Create message text
      const productTitles = compareProducts.map(p => p.title.split("\n\n")[0]).join(", ");
      const message = encodeURIComponent(
        `Check out this mattress comparison from VIZKO Global Exports! Products compared: ${productTitles}`
      );
      
      // Open WhatsApp
      const whatsappUrl = `https://wa.me/?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "PDF ready to share",
        description: "PDF has been generated for sharing on WhatsApp",
      });
      
    } catch (error) {
      console.error("Error sharing on WhatsApp:", error);
      toast({
        title: "Error sharing",
        description: "There was a problem sharing the comparison.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-primary shadow-lg border-t border-primary/80 transition-all duration-300 z-50 ${
      isExpanded ? 'max-h-[90vh] md:max-h-[80vh]' : 'max-h-20 sm:max-h-28'
    }`}>
      <div className="container mx-auto px-2 sm:px-4 py-1 sm:py-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
          <div className="flex items-center">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white">
              Compare <span className="hidden sm:inline">Products</span> <span className="text-xs sm:text-sm font-normal text-gray-200">({compareProducts.length}/4)</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
            {/* Export to PDF button */}
            <Button
              variant="outline"
              size="sm"
              onClick={generatePDF}
              disabled={isExporting || compareProducts.length === 0}
              className="text-back border-white hover:bg-white/10 flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
            >
              <FileDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            
            {/* Share on WhatsApp button */}
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnWhatsApp}
              disabled={isExporting || compareProducts.length === 0}
              className="text-black border-white hover:bg-white/10 flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-gray-200 hover:text-white hover:bg-white/10 flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
            >
              Clear All
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
            >
              {isExpanded ? (
                <>
                  <MoveDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Close</span>
                </>
              ) : (
                <>
                  <MoveUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Expand</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Comparison table - Only show when expanded */}
        {isExpanded && (
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-[600px] sm:min-w-[800px] md:min-w-0">
              <table
                ref={tableRef}
                className="w-full table-fixed border-collapse bg-white rounded-lg"
              >
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-1 sm:p-2 w-[100px] sm:w-[120px] bg-gray-50 whitespace-nowrap sticky left-0 z-10">
                      Feature
                    </th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="p-1 sm:p-2 min-w-[150px] sm:min-w-[200px]">
                        <div className="flex flex-col items-center">
                          {/* Product Image with remove button */}
                          <div className="relative w-full mb-1 sm:mb-2">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover mx-auto rounded-md shadow-sm"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-white border border-gray-200"
                              onClick={() => onRemoveFromCompare(product.id)}
                            >
                              <X className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                          </div>

                          {/* Product info below image */}
                          <div className="w-full text-center px-1 sm:px-2">
                            <h4 className="text-[10px] sm:text-xs md:text-sm font-medium line-clamp-1 mb-0.5 sm:mb-1">
                              {product.title.split("\n\n")[0]}
                            </h4>
                            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 line-clamp-2 mb-0.5 sm:mb-1">
                              {product.description}
                            </p>
                            <p className="text-primary font-bold text-xs sm:text-sm md:text-base">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                    {/* Empty cells for missing products */}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="p-1 sm:p-2 min-w-[150px] sm:min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-100 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">Add product</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Category */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-1 sm:p-2 font-medium sticky left-0 z-10 bg-gray-50 text-xs sm:text-sm">Category</td>
                    {compareProducts.map((product) => (
                      <td key={`cat-${product.id}`} className="p-1 sm:p-2 text-center capitalize text-xs sm:text-sm">
                        {product.category}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <td key={`empty-cat-${i}`} className="p-1 sm:p-2"></td>
                    ))}
                  </tr>

                  {/* Dimensions */}
                  <tr className="border-b border-gray-200">
                    <td className="p-1 sm:p-2 font-medium sticky left-0 z-10 bg-white text-xs sm:text-sm">Dimensions</td>
                    {compareProducts.map((product) => (
                      <td key={`dim-${product.id}`} className="p-1 sm:p-2 text-center text-[10px] sm:text-xs md:text-sm">
                        {product.length}" × {product.breadth}" × {product.height}"
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <td key={`empty-dim-${i}`} className="p-1 sm:p-2"></td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-1 sm:p-2 font-medium sticky left-0 z-10 bg-gray-50 text-xs sm:text-sm">Description</td>
                    {compareProducts.map((product) => (
                      <td key={`desc-${product.id}`} className="p-1 sm:p-2 text-[8px] sm:text-[10px] md:text-xs">
                        <p className="line-clamp-4 text-gray-700">{product.description}</p>
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <td key={`empty-desc-${i}`} className="p-1 sm:p-2"></td>
                    ))}
                  </tr>

                  {/* Layers */}
                  <tr className="border-b border-gray-200">
                    <td className="p-1 sm:p-2 font-medium sticky left-0 z-10 bg-white text-xs sm:text-sm">Layers</td>
                    {compareProducts.map((product) => (
                      <td key={`layer-${product.id}`} className="p-1 sm:p-2 text-[8px] sm:text-[10px] md:text-xs">
                        <p className="text-gray-700">{product.additionalDescription}</p>
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <td key={`empty-layer-${i}`} className="p-1 sm:p-2"></td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-1 sm:p-2 font-medium sticky left-0 z-10 bg-gray-50 text-xs sm:text-sm">Price</td>
                    {compareProducts.map((product) => (
                      <td key={`price-${product.id}`} className="p-1 sm:p-2 text-center">
                        <p className="text-sm sm:text-base md:text-lg font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                      <td key={`empty-price-${i}`} className="p-1 sm:p-2"></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}