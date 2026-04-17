
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ image, name, company, review, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="bg-card border border-border shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 h-full group">
        <CardContent className="p-8 flex flex-col h-full">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
            ))}
          </div>

          <p className="text-primary text-lg leading-relaxed font-medium italic mb-8 flex-grow">
            "{review}"
          </p>

          <div className="flex items-center gap-4 mt-auto">
            <div className="relative">
              <img 
                src={image} 
                alt={name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-accent shadow-sm"
              />
            </div>
            <div>
              <h4 className="font-bold text-primary text-base leading-tight group-hover:text-accent transition-colors duration-300">{name}</h4>
              <p className="text-secondary font-medium text-sm mt-0.5">{company}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
