import { CheckCircle, Lightbulb, Leaf } from "lucide-react";

export default function MissionVision() {
  return (
    <div className="bg-accent py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">Mission & Vision</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Quality */}
          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">Quality</h3>
            <p className="text-gray-700">
              To maintain uncompromising standards in every mattress we produce, ensuring each export shipment reflects our commitment to excellence.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Lightbulb className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">Innovation</h3>
            <p className="text-gray-700">
              To continuously improve our products through research and development, adapting to evolving global standards and customer needs.
            </p>
          </div>

          {/* Sustainability */}
          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Leaf className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">Sustainability</h3>
            <p className="text-gray-700">
              To embrace environmentally responsible manufacturing practices while delivering products that stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
