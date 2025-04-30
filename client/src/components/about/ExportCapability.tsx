import { Building, Home, Hotel, MapPin, Ship } from "lucide-react";

export default function ExportCapability() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary text-center mb-12">Export Capability</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Our Facilities</h3>
              <p className="text-gray-700 mb-6">
                Our state-of-the-art manufacturing facility spans 50,000 sq. ft. and is equipped with the latest technology to produce up to 1000 mattresses daily. Our dedicated export division handles all logistics and compliance requirements.
              </p>
              
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4 mt-8">Custom OEM Options</h3>
              <p className="text-gray-700">
                We offer white-labeling and custom manufacturing services to meet specific brand requirements. Our design team works closely with clients to develop products that meet their exact specifications.
              </p>
            </div>
            
            <div>
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">Global Clients</h3>
              <p className="text-gray-700 mb-4">
                We proudly serve clients across various sectors worldwide:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li className="flex items-start">
                  <Hotel className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span>Luxury hotel chains in Europe and the Middle East</span>
                </li>
                <li className="flex items-start">
                  <Building className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span>Furniture retailers and distributors in North America</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span>Healthcare facilities in Australia and New Zealand</span>
                </li>
                <li className="flex items-start">
                  <Ship className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span>Cruise line operators based in the Mediterranean</span>
                </li>
                <li className="flex items-start">
                  <Home className="text-primary mt-1 mr-3 h-5 w-5" />
                  <span>Real estate developers across Southeast Asia</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
