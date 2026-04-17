
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

const RecentWorkCard = ({ image, problem, solution, result, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="bg-card border border-border shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full group flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img 
            src={image} 
            alt="Website Mockup Case Study" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        
        <CardContent className="p-8 flex-grow flex flex-col justify-between">
          <ul className="space-y-6">
            <li className="flex flex-col gap-1.5">
              <span className="text-accent font-bold text-sm tracking-widest uppercase">Problema:</span>
              <span className="text-secondary font-medium text-base leading-relaxed">{problem}</span>
            </li>
            <li className="flex flex-col gap-1.5">
              <span className="text-accent font-bold text-sm tracking-widest uppercase">Soluția noastră:</span>
              <span className="text-secondary font-medium text-base leading-relaxed">{solution}</span>
            </li>
            <li className="flex flex-col gap-2 pt-2 border-t border-border">
              <span className="text-accent font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                Rezultatul:
                <ArrowRightCircle className="w-4 h-4" />
              </span>
              <span className="text-primary font-bold text-[17px] leading-relaxed">{result}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentWorkCard;
