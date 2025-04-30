import { Award, Bed, FileCheck, Ruler } from "lucide-react";

export default function WhyChoose() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">Why Choose VIZKO</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-lg p-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-primary text-4xl mb-4">
              <Award className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">
              Export Grade Foam
            </h3>
            <p className="text-gray-700">
              Our mattresses feature the highest quality foam that meets international export standards for durability and comfort.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-lg p-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-primary text-4xl mb-4">
              <Bed className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">
              Durable & Comfortable
            </h3>
            <p className="text-gray-700">
              Engineered to provide optimal support and comfort while maintaining exceptional longevity and resilience.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-lg p-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-primary text-4xl mb-4">
              <FileCheck className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">
              Certified Manufacturing
            </h3>
            <p className="text-gray-700">
              Our facilities and processes are certified to meet international quality and safety standards.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-50 rounded-lg p-8 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div className="text-primary text-4xl mb-4">
              <Ruler className="h-10 w-10" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-3">
              Custom Sizing Available
            </h3>
            <p className="text-gray-700">
              We offer customizable dimensions to meet specific market needs and individual client requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
