export default function CompanyIntro() {
  return (
    <div className="pt-20 bg-accent">
      <div className="relative">
        <div className="absolute inset-0 bg-primary opacity-60"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">About VIZKO</h1>
            <p className="text-white text-lg md:text-xl">
              At VIZKO, we specialize in manufacturing and exporting premium-grade mattresses from India to the world.
            </p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
          alt="Premium mattress manufacturing" 
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      </div>
    </div>
  );
}
