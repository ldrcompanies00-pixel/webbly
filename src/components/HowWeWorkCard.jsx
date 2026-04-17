
import React from 'react';
import { motion } from 'framer-motion';

const HowWeWorkCard = ({ stepNumber, icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative bg-card rounded-2xl p-10 border border-border shadow-sm hover:shadow-lg hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
    >
      {/* Large Number Top Left */}
      <div className="absolute top-0 left-6 -translate-y-1/2 w-14 h-14 bg-accent text-accent-foreground rounded-xl flex items-center justify-center text-xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
        {stepNumber}
      </div>
      
      {/* Centered Gold Icon */}
      <div className="w-20 h-20 bg-muted border border-border/50 rounded-2xl flex items-center justify-center mb-8 mt-4 group-hover:border-accent/50 transition-colors duration-300 shadow-sm">
        <Icon className="w-10 h-10 text-accent" strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="text-secondary leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};

export default HowWeWorkCard;
