export default function ContactInfo() {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="font-playfair text-2xl font-bold text-primary mb-6">Company Contact Info</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="text-primary text-xl mt-1 mr-4">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Email</h3>
              <p className="text-gray-700">sales@vizkoexports.com</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary text-xl mt-1 mr-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Phone</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary text-xl mt-1 mr-4">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Location</h3>
              <p className="text-gray-700">India (Manufacturing Unit)</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="text-primary text-xl mt-1 mr-4">
              <i className="fas fa-globe"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Export Available</h3>
              <p className="text-gray-700">Worldwide</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Map */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="font-playfair text-2xl font-bold text-primary mb-6">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9 h-64 bg-gray-200 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9014256111697!2d72.55773615025892!3d23.0336313845843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84ed080ac6a9%3A0xdac8bc2a30c1da18!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1655283444954!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="VIZKO Manufacturing Location"
          />
        </div>
      </div>
    </div>
  );
}
