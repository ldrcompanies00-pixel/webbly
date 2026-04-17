import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket } from 'lucide-react';
import HowWeWorkCard from '@/components/HowWeWorkCard.jsx';

const HowWeWorkSection = () => {
  const steps = [
    {
      stepNumber: '01',
      icon: Search,
      title: 'Descoperire & Strategie',
      description: 'Începem printr-o discuție detaliată pentru a înțelege obiectivele afacerii tale, publicul țintă și competiția directă.'
    },
    {
      stepNumber: '02',
      icon: PenTool,
      title: 'Design & Dezvoltare',
      description: 'Creăm un design personalizat, modern și implementăm site-ul folosind cele mai noi și performante tehnologii web.'
    },
    {
      stepNumber: '03',
      icon: Rocket,
      title: 'Lansare & Optimizare',
      description: 'Testăm riguros fiecare detaliu, lansăm proiectul și îl optimizăm pentru a genera conversii și lead-uri calificate.'
    }
  ];

  return (
    <section className="bg-background py-24 border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Cum Lucrăm</h2>
          <p className="text-xl text-secondary leading-relaxed font-medium">
            Un proces simplu și transparent pentru a transforma ideea ta în realitate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {steps.map((step, index) => (
            <HowWeWorkCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;