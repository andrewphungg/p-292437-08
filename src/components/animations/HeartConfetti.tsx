
import React from "react";
import { motion } from "framer-motion";

export const HeartConfetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500"
          initial={{ opacity: 1, scale: Math.random() * 0.3 + 0.7 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            x: `${(Math.random() - 0.5) * 100}px`, 
            y: `${Math.random() * -100 - 50}px`, 
            rotate: `${Math.random() * 360}deg` 
          }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
