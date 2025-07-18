import React from 'react';
import VideoPlayer from '../VideoPlayer';

const Demo: React.FC = () => {
  return (
    <section id="demo" className="py-20 bg-beauty-cream">
      <div className="safe-zone">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-beauty-purple mb-6">
            Zobacz swojego agenta w <span className="text-beauty-pink">akcji</span>
          </h2>
          <p className="text-xl text-beauty-purple max-w-3xl mx-auto">
            Zobacz, jak nasz agent AI prowadzi prawdziwe rozmowy z klientami — z taką samą życzliwością i profesjonalizmem jak Ty
          </p>
        </div>

        <div className="mb-8">
          <VideoPlayer
            src="https://kqiueydxpgxcqelzuosu.supabase.co/storage/v1/object/public/videos//Demo.mp4"
            className="mx-auto"
            autoPlay={true}
          />
        </div>

        <p className="text-center text-lg text-beauty-purple font-medium">
          Prawdziwa rozmowa między naszym agentem AI a potencjalnym klientem
        </p>
      </div>
    </section>
  );
};

export default Demo;
