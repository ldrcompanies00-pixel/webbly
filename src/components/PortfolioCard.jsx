
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const PortfolioCard = ({ image, title, description, category, span = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={span === 2 ? 'md:col-span-2 h-full' : 'h-full'}
    >
      <Card className="bg-card border border-border overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        <CardContent className="p-8 flex-grow flex flex-col">
          <Badge className="w-fit mb-4 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300 border-none">
            {category}
          </Badge>
          <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300 text-balance">{title}</h3>
          <p className="text-secondary leading-relaxed text-base">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioCard;
