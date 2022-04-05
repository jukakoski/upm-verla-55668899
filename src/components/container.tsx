import React from "react";
import { motion } from "framer-motion"

const Container: React.FC = ({ children }) => {

  return (<motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1  }}
    exit={{ opacity: 0 }}
    transition={{
      type: "keyframes",
      duration: 0.5
    }}
  >
    <div className="container mx-auto px-5">{children}</div>
  </motion.main>
  )
}

export default Container
