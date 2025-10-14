import { Truck, Shield, Headphones } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Our free shipping policy applies to all orders, regardless of order value or destination."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your payments is always safe, secure, and protected at all times."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We are available 24/7 to assist you with any questions, or issues you may have."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index}
              className="group text-center flex flex-col items-center p-6 rounded-lg hover:bg-cyan-50 transition-colors duration-300"
            >
              <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-cyan-100 transition-colors duration-300">
                <IconComponent className="w-10 h-10 text-cyan-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg max-w-sm">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;