'use client'

import React from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <SessionProvider>
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
            <div className="wrapper_child">
              <div className="navbar">
                <Navbar />
                {children}
              </div>
            </div>
          </motion.main>
        </SessionProvider>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default RootTemplate
