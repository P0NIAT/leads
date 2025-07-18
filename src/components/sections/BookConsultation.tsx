import React from 'react';

const BookConsultation: React.FC = () => {
  return (
    <section id="book-consultation" className="py-20 bg-gradient-to-br from-beauty-purple to-beauty-pink">
      <div className="safe-zone">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-6">
            Zarezerwuj <span className="text-beauty-lavender">darmową konsultację</span>
          </h2>
          <p className="text-xl text-beauty-cream max-w-3xl mx-auto">
            Gotowy, by odmienić swój biznes dzięki AI? Umów się na bezpłatną konsultację, aby omówić swoje potrzeby i zobaczyć, jak nasi agenci AI mogą zwiększyć liczbę Twoich rezerwacji.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <iframe
              src="https://calendly.com/smartleadsai/free-consultation"
              width="100%"
              height="900"
              frameBorder="0"
              scrolling="no"
              className="block"
              title="Schedule a Free Consultation"
            ></iframe>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-beauty-lavender font-medium">
              ✨ Bez zobowiązań • 30-minutowa sesja • Spersonalizowane rekomendacje
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookConsultation;
