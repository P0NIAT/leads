import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import Logo from './Logo';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [iconColor, setIconColor] = useState('text-beauty-pink');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hejka! 👋 Miło, że jesteś tutaj. Jak mogę Ci dziś pomóc?',
      isUser: false,
      timestamp: new Date(),     
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true);
        setTimeout(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }, 1000);
      }

      const currentSection = getCurrentSection();
      if (currentSection && (currentSection.includes('hero') || currentSection.includes('pricing') || currentSection.includes('footer'))) {
        setIconColor('text-white');
      } else {
        setIconColor('text-beauty-pink');
      }
    };

    const getCurrentSection = () => {
      const sections = document.querySelectorAll('section, header, footer');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          return section.className || section.tagName.toLowerCase();
        }
      }
      return '';
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter(msg => msg.id !== '1')
        .map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }));

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: currentMessage,
          messages: conversationHistory
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showPopup && (
          <div 
            className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 mb-2 max-w-xs animate-fade-in-up cursor-pointer flex items-center gap-3"
            onClick={openChat}
            style={{ filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))', minWidth: '260px' }}
          >
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src="https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//kate.jpg" alt="Kate" />
              <AvatarFallback className="bg-beauty-pink text-white text-sm font-semibold">K</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-sm text-gray-700 font-medium">
                Cześć! Masz pytanie? Napisz do nas tutaj.
              </div>
            </div>
            <Button onClick={(e) => { e.stopPropagation(); setShowPopup(false); }} variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={14} />
            </Button>
          </div>
        )}
        
        <Button
          onClick={openChat}
          data-chat-widget
          className="w-16 h-16 rounded-full bg-white hover:bg-gray-50 shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-gray-100"
          size="icon"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
        >
          <MessageCircle size={28} className={iconColor} />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md h-96 flex flex-col animate-fade-in-up">
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-beauty-purple to-beauty-pink text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <Logo showText={false} size="sm" />
                <h3 className="font-montserrat font-bold text-lg">Smart Leads AI</h3>
              </div>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" className="text-white hover:bg-white/20 h-8 w-8">
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  {!message.isUser && (
                    <Avatar className="w-8 h-8 mr-3 flex-shrink-0">
                      <AvatarImage src="https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//kate.jpg" alt="Kate" />
                      <AvatarFallback className="bg-beauty-pink text-white text-xs font-semibold">K</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.isUser ? 'bg-gray-100 text-gray-800 ml-auto' : 'bg-beauty-lavender text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <Avatar className="w-8 h-8 mr-3 flex-shrink-0">
                    <AvatarImage src="https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/pictures//kate.jpg" alt="Kate" />
                    <AvatarFallback className="bg-beauty-pink text-white text-xs font-semibold">K</AvatarFallback>
                  </Avatar>
                  <div className="bg-beauty-lavender text-white px-3 py-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Napisz wiadomość..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="bg-beauty-pink hover:bg-beauty-pink/90 text-white px-3"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
