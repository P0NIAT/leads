
import React, { useState, useEffect } from 'react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Amelia Jones",
      business: "Radiance Beauty Spa",
      location: "London",
      quote: "Smart Leads AI has transformed our customer service. The AI sounds exactly like me - our clients can't tell the difference!",
      rating: 5,
      avatar: "https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//owner1.jpg"
    },
    {
      name: "Isla Robinson", 
      business: "Elite Hair Studio",
      location: "Birmingham",
      quote: "We've seen an increase in bookings since implementing AI Agent. It's like having a dedicated receptionist 24/7.",
      rating: 5,
      avatar: "https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//owner2.jpg"
    },
    {
      name: "Sophie Chen",
      business: "Zen Wellness Clinic", 
      location: "Manchester",
      quote: "The personalization is incredible. The AI agent maintains our brand voice perfectly across all customer interactions.",
      rating: 5,
      avatar: "https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//owner3.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-beauty-purple to-beauty-pink">
      <div className="safe-zone">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-6">
            What Our <span className="text-beauty-lavender">Clients</span> Say
          </h2>
          <p className="text-xl text-beauty-cream max-w-3xl mx-auto">
            Join hundreds of beauty businesses already growing with Smart Leads AI
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-beauty-lavender text-2xl">★</span>
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    <div>
                      <div className="font-montserrat font-bold text-lg text-beauty-lavender">
                        {testimonial.name}
                      </div>
                      <div className="text-beauty-cream">
                        {testimonial.business}, {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-beauty-lavender' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
