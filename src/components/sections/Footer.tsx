import React, { useState } from 'react';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting contact form:', formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        console.error('Error sending email:', error);
        toast.error('Nie udało się wysłać wiadomości. Spróbuj ponownie.');
        return;
      }

      console.log('Email sent successfully:', data);
      toast.success('Wiadomość została wysłana! Skontaktujemy się z Tobą wkrótce.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Nie udało się wysłać wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@smartleadsai.io';
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-beauty-purple to-beauty-pink text-white py-12">
      <div className="safe-zone">
        {/* Logo and Company Name - Centered */}
        <div className="text-center mb-8">
          <Logo className="justify-center mb-4" />
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="font-montserrat font-bold text-2xl text-center mb-6 text-beauty-cream">
              Skontaktuj się z nami
            </h3>
            
            {/* Email Address Button */}
            <div className="flex justify-center mb-6">
              <Button 
                onClick={handleEmailClick}
                className="bg-beauty-lavender hover:bg-beauty-purple text-white font-montserrat font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:transform hover:scale-105 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                info@smartleadsai.io
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-beauty-cream font-medium mb-2 block">
                    Imię i nazwisko *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-beauty-cream focus:ring-beauty-cream"
                    placeholder="Twoje imię i nazwisko"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-beauty-cream font-medium mb-2 block">
                    Adres e-mail *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-beauty-cream focus:ring-beauty-cream"
                    placeholder="twoj@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-beauty-cream font-medium mb-2 block">
                  Numer telefonu
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-beauty-cream focus:ring-beauty-cream"
                  placeholder="501234567"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-beauty-cream font-medium mb-2 block">
                  Wiadomość *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-beauty-cream focus:ring-beauty-cream resize-none"
                  placeholder="Napisz, jak możemy pomóc Twojej firmie..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-beauty-cream text-beauty-purple hover:bg-white font-montserrat font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 mt-8 text-center">
          <p className="text-gray-200">© 2025 Smart Leads AI. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
