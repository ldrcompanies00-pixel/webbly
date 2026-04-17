
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="bg-card border border-border shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 h-full group">
        <CardContent className="p-8 flex flex-col h-full">
          <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mb-6 group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
            <Icon className="w-8 h-8 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors duration-300 text-balance">{title}</h3>
          <p className="text-secondary leading-relaxed text-base">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
