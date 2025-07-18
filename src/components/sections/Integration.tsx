import React from 'react';
import { Instagram, MessageCircle, Phone, Globe, FileSpreadsheet, Target, Mail, Calendar } from 'lucide-react';

const Integration: React.FC = () => {
  const integrations = [
    { name: "Instagram", icon: Instagram, bgColor: "bg-gradient-to-br from-purple-500 to-pink-500" },
    { name: "Messenger", icon: MessageCircle, bgColor: "bg-gradient-to-br from-blue-500 to-purple-500" },
    { name: "WhatsApp", icon: Phone, bgColor: "bg-green-500" },
    { name: "Strona WWW", icon: Globe, bgColor: "bg-gradient-to-br from-red-500 via-yellow-500 to-green-500" },
    { name: "Arkusze Google", icon: FileSpreadsheet, bgColor: "bg-green-600" },
    { name: "HubSpot", icon: Target, bgColor: "bg-orange-500" },
    { name: "Twilio", icon: Mail, bgColor: "bg-red-500" },
    { name: "Calendly", icon: Calendar, bgColor: "bg-blue-500" }
  ];

  return (
    <section className="py-20 bg-beauty-cream">
      <div className="safe-zone">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-beauty-purple mb-6">
            Bezproblemowa <span className="text-beauty-pink">integracja</span>
          </h2>
          <p className="text-xl text-beauty-purple max-w-3xl mx-auto">
            Połącz się ze swoimi ulubionymi narzędziami i platformami w kilka kliknięć
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-8 rounded-3xl bg-white hover:bg-beauty-lavender/5 transition-all duration-300 group shadow-lg border border-gray-100 hover:shadow-xl"
              >
                <div className={`w-20 h-20 ${integration.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <span className="font-montserrat font-semibold text-beauty-purple text-center">
                  {integration.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Integration;
