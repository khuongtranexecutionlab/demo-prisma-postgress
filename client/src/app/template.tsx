'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <motion.main
          className="template"
          transition={{
            duration: 0.5,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default RootTemplate
