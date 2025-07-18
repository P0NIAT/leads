import React from 'react';
import { Button } from '@/components/ui/button';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "£49",
      period: "/miesiąc*",
      description: "Uruchom swoją pierwszą automatyzację — idealne dla nowych lub małych firm, które chcą zaoszczędzić czas i zdobyć pierwszych klientów.",
      features: [
        "1 agent AI",
        "1 asystent social media",
        "1 aktualizacja miesięcznie",
        "500 konwersacji/miesiąc",
        "HubSpot CRM",
        "Możliwość anulowania w każdej chwili"
      ],
      popular: false,
      bgColor: "bg-white",
      icon: "💼"
    },
    {
      name: "Premium", 
      price: "£99",
      period: "/miesiąc*",
      description: "Odblokuj potężne narzędzia i inteligentniejsze przepływy pracy, zaprojektowane z myślą o rozwijających się salonach beauty.",
      features: [
        "3 agentów AI",
        "3 asystentów social media", 
        "3 aktualizacje miesięcznie",
        "1 500 konwersacji/miesiąc",
        "HubSpot CRM",
        "Możliwość anulowania w każdej chwili"
      ],
      popular: true,
      bgColor: "bg-beauty-pink/10",
      icon: "🚀"
    },
    {
      name: "Ultimate",
      price: "£399",
      period: "/miesiąc*",
      description: "Kompletny pakiet oparty na realnym doświadczeniu – automatyzacja, analizy i wzrost dla ambitnych salonów.",
      features: [
        "1 głosowy asystent AI",
        "5 agentów AI",
        "5 asystentów social media",
        "5 aktualizacji miesięcznie", 
        "Nielimitowane konwersacje",
        "CRM do wyboru",
        "Możliwość anulowania w każdej chwili"
      ],
      popular: false,
      bgColor: "bg-beauty-lavender/10",
      icon: "👑"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-beauty-cream">
      <div className="safe-zone">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-beauty-purple mb-6">
            Prosty cennik dla <span className="text-beauty-pink">pięknych</span> efektów
          </h2>
          <p className="text-xl text-beauty-purple max-w-3xl mx-auto">
            Wybierz idealny plan dla swojego salonu. Każdy pakiet zawiera wszystko, czego potrzebujesz na start.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${plan.bgColor} border-2 ${
                plan.popular
                  ? 'border-beauty-pink shadow-2xl'
                  : 'border-beauty-lavender/20 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-beauty-pink text-white px-4 py-2 rounded-full font-montserrat font-bold text-sm whitespace-nowrap">
                    ✨ Najczęściej wybierany
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-beauty-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{plan.icon}</span>
                </div>
                <h3 className="font-montserrat font-bold text-2xl mb-2 text-beauty-purple">
                  {plan.name}
                </h3>
                <p className="mb-6 text-beauty-purple">
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className="text-5xl font-montserrat font-bold text-beauty-purple">
                    {plan.price}
                  </span>
                  <span className="text-lg text-beauty-purple">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <span className="text-xl text-beauty-pink">
                      ✓
                    </span>
                    <span className="text-beauty-purple">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 font-montserrat font-bold text-lg transition-all duration-300 bg-beauty-pink hover:bg-beauty-purple text-white"
              >
                <span className="hidden md:inline lg:hidden">Wybierz plan</span>
                <span className="md:hidden lg:inline">Wybierz swój plan</span>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-beauty-purple mt-8">
          * + opłata wdrożeniowa
        </p>
      </div>
    </section>
  );
};

export default Pricing;
