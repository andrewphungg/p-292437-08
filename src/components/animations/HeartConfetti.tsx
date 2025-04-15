
import React from "react";
import { motion } from "framer-motion";

export const HeartConfetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500"
          style={{
            left: `${Math.random() * 75 + 10}%`,
            top: `${Math.random() * 75 + 10}%`,
            fontSize: `${Math.random() * 10 + 14}px`
          }}
          initial={{ opacity: 1, scale: Math.random() * 0.2 + 0.8 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            y: `${Math.random() * -50 - 20}px`, 
            x: `${(Math.random() - 0.5) * 60}px`,
            rotate: `${Math.random() * 180 - 90}deg` 
          }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.04,
            ease: "easeOut"
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
