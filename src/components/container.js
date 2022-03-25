import React from "react";
import { motion } from "framer-motion"

export default function Container({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 0, y: 0 }}
      transition={{
        type: "keyframes",
        mass: 0.35,
        stiffness: 75,
        duration: 0.5
      }}
    >
      <div className="container mx-auto px-5">{children}</div>
    </motion.main>
  )


}
