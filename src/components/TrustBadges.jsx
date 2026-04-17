
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Award,
      title: 'Certificat Google Partner',
      description: 'Standarde de excelență în campanii'
    },
    {
      icon: ShieldCheck,
      title: 'Certificări Facebook Blueprint',
      description: 'Strategii validate de Meta'
    },
    {
      icon: CheckCircle,
      title: '100+ Proiecte de Succes',
      description: 'Rezultate dovedite în piață'
    }
  ];

  return (
    <section className="py-16 bg-background border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h3 className="text-xl md:text-2xl font-semibold text-secondary max-w-3xl mx-auto">
            Lucrăm folosind standarde internaționale și strategii validate de platforme precum Google și Meta.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <badge.icon className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-lg font-bold text-primary mb-2">{badge.title}</h4>
              <p className="text-secondary text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
