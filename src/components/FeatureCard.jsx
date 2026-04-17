import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-5 group"
    >
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-secondary group-hover:text-primary transition-colors duration-300 text-balance">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;