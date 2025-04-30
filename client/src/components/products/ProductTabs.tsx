import { Button } from "@/components/ui/button";

interface ProductTabsProps {
  activeProduct: string;
  setActiveProduct: (product: string) => void;
}

export default function ProductTabs({ activeProduct, setActiveProduct }: ProductTabsProps) {
  const tabs = [
    { id: "hybrid", label: "Hybrid" },
    { id: "innerspring", label: "Inner Spring" },
    { id: "memoryfoam", label: "Memory Foam" },
    { id: "orthopaedic", label: "Orthopaedic" }
  ];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeProduct === tab.id ? "default" : "outline"}
            onClick={() => setActiveProduct(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeProduct === tab.id 
                ? "bg-primary text-white shadow-lg scale-105" 
                : "bg-white text-primary border border-primary hover:bg-primary/10"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
