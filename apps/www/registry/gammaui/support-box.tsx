'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

type MenuItem = {
  title: string
  description: string
  icon: React.ReactNode
  onPress: () => void
}

interface SupportBoxProps {
  title?: string
  items: MenuItem[]
  collapsedWidth?: number
  collapsedHeight?: number
  expandedWidth?: number
  expandedHeight?: number
  className?: string
  containerClassName?: string
  titleClassName?: string
  itemClassName?: string
  bgColor?: string
  borderColor?: string
}

export function SupportBox({
  items,
  title = 'Need Help?',
  collapsedWidth = 120,
  collapsedHeight = 40,
  expandedWidth = 300,
  expandedHeight = 320,
  className = '',
  containerClassName = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  titleClassName = 'text-gray-800 dark:text-gray-100',
  itemClassName = 'text-gray-800 dark:text-gray-100',
  bgColor = '',
  borderColor = '',
}: SupportBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const boxVariants: Variants = {
    collapsed: {
      width: collapsedWidth,
      height: collapsedHeight,
      transition: { type: 'spring' as const, stiffness: 200, damping: 25 },
    },
    expanded: {
      width: expandedWidth,
      height: expandedHeight,
      transition: { type: 'spring' as const, stiffness: 180, damping: 22 },
    },
  }

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1, duration: 0.25, ease: 'easeOut' },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className={`relative ${className}`}
      variants={boxVariants}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      initial="collapsed"
      layout
    >
      <div
        className={`${containerClassName} ${bgColor} ${borderColor} rounded-xl shadow-lg overflow-hidden h-full p-2`}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              className="p-4 h-full flex flex-col"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${titleClassName}`}>
                  {title}
                </h3>
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
                  aria-label="Close menu"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              <motion.div
                className="space-y-3 overflow-y-auto flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {items.map((option, index) => (
                  <motion.button
                    key={`${option.title}-${index}`}
                    onClick={option.onPress}
                    className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border border-gray-100 dark:border-gray-700 text-left transition-all ${itemClassName}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-2xl mr-3 shrink-0 text-gray-700 dark:text-gray-300">
                      {option.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{option.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              onClick={() => setIsExpanded(true)}
              className={`w-full h-full flex items-center justify-center font-medium ${titleClassName}`}
              aria-label={`Expand ${title}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {title}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default SupportBox
