'use client'

import React from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react'

const RootTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <SessionProvider>
          <NextUIProvider>
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
                <Navbar />
                {children}
              </div>
            </motion.main>
          </NextUIProvider>
        </SessionProvider>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default RootTemplate
