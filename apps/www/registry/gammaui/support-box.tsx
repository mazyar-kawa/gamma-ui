'use client'

import { useState } from 'react';

type MenuItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
};

interface SupportBoxProps {
  title?: string;
  items: MenuItem[];
  collapsedWidth?: number;
  collapsedHeight?: number;
  expandedWidth?: number;
  expandedHeight?: number;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  itemClassName?: string;
  bgColor?: string;
  borderColor?: string;
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        width: isExpanded ? expandedWidth : collapsedWidth,
        height: isExpanded ? expandedHeight : collapsedHeight,
      }}
    >
      <div className={`${containerClassName} ${bgColor} ${borderColor} rounded-xl shadow-lg overflow-hidden h-full`}>
        {isExpanded ? (
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${titleClassName}`}>
                {title}
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1">
              {items?.map((option, index) => (
                <button
                  key={`${option.title}-${index}`}
                  className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02] active:scale-95 text-left ${itemClassName}`}
                  onClick={option.onPress}
                >
                  <span className="text-2xl mr-3 shrink-0 text-gray-700 dark:text-gray-300">{option.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {option.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className={`w-full h-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 font-medium ${titleClassName}`}
            aria-label={`Expand ${title}`}
          >
            <span>
              {title}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SupportBox;
