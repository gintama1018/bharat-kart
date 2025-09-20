'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CulturalLoadingProps {
  state: string
  theme: string
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
}

export function CulturalLoading({ state, theme, colorPrimary, colorSecondary, colorAccent }: CulturalLoadingProps) {
  const [loadingText, setLoadingText] = useState('')
  
  const stateTexts = {
    rajasthan: ['राजस्थान में आपका स्वागत है', 'Welcome to the Land of Kings', 'Discovering Royal Heritage...'],
    kerala: ['केरल में आपका स्वागत है', 'Welcome to Gods Own Country', 'Exploring Backwater Paradise...'],
    gujarat: ['गुजरात में आपका स्वागत है', 'Welcome to Vibrant Gujarat', 'Unveiling Colorful Traditions...'],
    'tamil-nadu': ['तमिल नाडु में आपका स्वागत है', 'Welcome to Tamil Heritage', 'Discovering Temple Arts...'],
    'west-bengal': ['पश्चिम बंगाल में आपका स्वागत है', 'Welcome to Cultural Renaissance', 'Exploring Artistic Heritage...'],
    punjab: ['पंजाब में आपका स्वागत है', 'Welcome to Land of Five Rivers', 'Discovering Harvest Traditions...'],
    maharashtra: ['महाराष्ट्र में आपका स्वागत है', 'Welcome to Cultural Capital', 'Exploring Maratha Heritage...'],
    karnataka: ['कर्नाटक में आपका स्वागत है', 'Welcome to Silicon Valley Heritage', 'Discovering Silk Traditions...'],
    'andhra-pradesh': ['आंध्र प्रदेश में आपका स्वागत है', 'Welcome to Pearl City', 'Exploring Spicy Heritage...'],
    telangana: ['तेलंगाना में आपका स्वागत है', 'Welcome to Nizami Heritage', 'Discovering Ikat Traditions...'],
    assam: ['असम में आपका स्वागत है', 'Welcome to Tea Gardens', 'Exploring Silk Heritage...'],
    odisha: ['ओडिशा में आपका स्वागत है', 'Welcome to Soul of India', 'Discovering Pattachitra Art...'],
    'madhya-pradesh': ['मध्य प्रदेश में आपका स्वागत है', 'Welcome to Heart of India', 'Exploring Tribal Heritage...'],
    'uttar-pradesh': ['उत्तर प्रदेश में आपका स्वागत है', 'Welcome to Heartland', 'Discovering Mughal Heritage...'],
    bihar: ['बिहार में आपका स्वागत है', 'Welcome to Land of Buddha', 'Exploring Madhubani Art...'],
    jharkhand: ['झारखंड में आपका स्वागत है', 'Welcome to Land of Forests', 'Discovering Tribal Crafts...'],
    haryana: ['हरियाणा में आपका स्वागत है', 'Welcome to Agricultural Heritage', 'Exploring Rural Traditions...'],
    'himachal-pradesh': ['हिमाचल प्रदेश में आपका स्वागत है', 'Welcome to Dev Bhoomi', 'Discovering Mountain Heritage...'],
    uttarakhand: ['उत्तराखंड में आपका स्वागत है', 'Welcome to Land of Gods', 'Exploring Himalayan Heritage...'],
    chhattisgarh: ['छत्तीसगढ़ में आपका स्वागत है', 'Welcome to Rice Bowl', 'Discovering Tribal Crafts...'],
    goa: ['गोवा में आपका स्वागत है', 'Welcome to Pearl of Orient', 'Exploring Coastal Heritage...'],
    manipur: ['मणिपुर में आपका स्वागत है', 'Welcome to Jewel of India', 'Discovering Dance Heritage...'],
    meghalaya: ['मेघालय में आपका स्वागत है', 'Welcome to Abode of Clouds', 'Exploring Bamboo Crafts...'],
    tripura: ['त्रिपुरा में आपका स्वागत है', 'Welcome to Land of Diversity', 'Discovering Tribal Heritage...'],
    mizoram: ['मिजोरम में आपका स्वागत है', 'Welcome to Blue Mountains', 'Exploring Mountain Traditions...'],
    nagaland: ['नागालैंड में आपका स्वागत है', 'Welcome to Land of Festivals', 'Discovering Festival Heritage...'],
    'arunachal-pradesh': ['अरुणाचल प्रदेश में आपका स्वागत है', 'Welcome to Rising Sun', 'Exploring Dawn Traditions...'],
    sikkim: ['सिक्किम में आपका स्वागत है', 'Welcome to Himalayan Paradise', 'Discovering Buddhist Art...'],
  }

  const texts = stateTexts[state.toLowerCase().replace(/\s+/g, '-') as keyof typeof stateTexts] || [
    'भारत में आपका स्वागत है',
    'Welcome to India',
    'Discovering Heritage...'
  ]

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setLoadingText(texts[index])
      index = (index + 1) % texts.length
    }, 2000)

    return () => clearInterval(interval)
  }, [texts])

  // Cultural patterns based on state
  const getStatePattern = () => {
    switch (state.toLowerCase().replace(/\s+/g, '-')) {
      case 'rajasthan':
        return (
          <motion.div className="relative">
            {/* Mandala pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="60" cy="60" r="50" fill="none" stroke={colorPrimary} strokeWidth="2" opacity="0.6" />
              <circle cx="60" cy="60" r="35" fill="none" stroke={colorSecondary} strokeWidth="2" opacity="0.8" />
              <circle cx="60" cy="60" r="20" fill="none" stroke={colorAccent} strokeWidth="2" />
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="60"
                  y1="10"
                  x2="60"
                  y2="30"
                  stroke={colorPrimary}
                  strokeWidth="3"
                  transform={`rotate(${i * 45} 60 60)`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'kerala':
        return (
          <motion.div className="relative">
            {/* Coconut and boat pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              <motion.path
                d="M20,60 Q60,20 100,60 Q60,100 20,60"
                fill="none"
                stroke={colorPrimary}
                strokeWidth="3"
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle
                cx="60"
                cy="60"
                r="25"
                fill={colorSecondary}
                opacity="0.6"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      case 'gujarat':
        return (
          <motion.div className="relative">
            {/* Rangoli pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(6)].map((_, i) => (
                <motion.polygon
                  key={i}
                  points="60,20 80,50 60,80 40,50"
                  fill={i % 2 === 0 ? colorPrimary : colorSecondary}
                  opacity="0.7"
                  transform={`rotate(${i * 60} 60 60)`}
                  animate={{ 
                    scale: [0.5, 1, 0.5],
                    opacity: [0.3, 0.9, 0.3] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.3 
                  }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'tamil-nadu':
        return (
          <motion.div className="relative">
            {/* Temple architecture pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Temple base */}
              <motion.rect
                x="30"
                y="70"
                width="60"
                height="20"
                fill={colorPrimary}
                animate={{ scaleX: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Temple pillars */}
              {[...Array(3)].map((_, i) => (
                <motion.rect
                  key={i}
                  x={40 + i * 20}
                  y="50"
                  width="8"
                  height="20"
                  fill={colorSecondary}
                  animate={{ scaleY: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
              {/* Gopuram pattern */}
              <motion.polygon
                points="60,10 70,40 50,40"
                fill={colorAccent}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      case 'west-bengal':
        return (
          <motion.div className="relative">
            {/* Alpona pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Fish motif */}
              <motion.path
                d="M30,60 Q50,40 70,60 Q50,80 30,60 M70,60 L85,55 L85,65 Z"
                fill={colorPrimary}
                animate={{ 
                  x: [0, 20, 0],
                  opacity: [0.6, 1, 0.6] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Rice pattern */}
              {[...Array(5)].map((_, i) => (
                <motion.ellipse
                  key={i}
                  cx={25 + i * 15}
                  cy="90"
                  rx="3"
                  ry="8"
                  fill={colorSecondary}
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'punjab':
        return (
          <motion.div className="relative">
            {/* Wheat and phulkari pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {/* Wheat stalks */}
              {[...Array(5)].map((_, i) => (
                <motion.g key={i}>
                  <motion.line
                    x1={25 + i * 15}
                    y1="80"
                    x2={25 + i * 15}
                    y2="40"
                    stroke={colorPrimary}
                    strokeWidth="3"
                    animate={{ scaleY: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                  {/* Wheat grains */}
                  {[...Array(8)].map((_, j) => (
                    <motion.circle
                      key={j}
                      cx={25 + i * 15 + (j % 2 === 0 ? -3 : 3)}
                      cy={75 - j * 4}
                      r="2"
                      fill={colorSecondary}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: (i + j) * 0.1 }}
                    />
                  ))}
                </motion.g>
              ))}
            </motion.svg>
          </motion.div>
        )
      
      case 'assam':
        return (
          <motion.div className="relative">
            {/* Tea leaf pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(8)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${60 + Math.cos(i * Math.PI / 4) * 30},${60 + Math.sin(i * Math.PI / 4) * 30} Q${60 + Math.cos(i * Math.PI / 4) * 40},${60 + Math.sin(i * Math.PI / 4) * 20} ${60 + Math.cos(i * Math.PI / 4) * 50},${60 + Math.sin(i * Math.PI / 4) * 40}`}
                  fill="none"
                  stroke={colorPrimary}
                  strokeWidth="2"
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0.3, 1, 0.3] 
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                />
              ))}
              <motion.circle
                cx="60"
                cy="60"
                r="15"
                fill={colorSecondary}
                opacity="0.6"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
      
      default:
        return (
          <motion.div className="relative">
            {/* Generic lotus pattern */}
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="absolute"
            >
              {[...Array(8)].map((_, i) => (
                <motion.ellipse
                  key={i}
                  cx="60"
                  cy="30"
                  rx="8"
                  ry="25"
                  fill={colorPrimary}
                  opacity="0.6"
                  transform={`rotate(${i * 45} 60 60)`}
                  animate={{ 
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
              <motion.circle
                cx="60"
                cy="60"
                r="10"
                fill={colorAccent}
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.svg>
          </motion.div>
        )
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colorPrimary}15, ${colorSecondary}15, ${colorAccent}15)`
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: i % 3 === 0 ? colorPrimary : i % 3 === 1 ? colorSecondary : colorAccent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative text-center">
        {/* Cultural pattern */}
        <div className="mb-8 flex justify-center">
          {getStatePattern()}
        </div>

        {/* Loading text */}
        <motion.div
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-2"
        >
          <h2 
            className="text-2xl font-bold"
            style={{ color: colorPrimary }}
          >
            {loadingText}
          </h2>
        </motion.div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colorSecondary }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Cultural quote */}
        <motion.p
          className="mt-6 text-lg italic max-w-md mx-auto"
          style={{ color: colorAccent }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &quot;Every craft tells a story, every artisan preserves history&quot;
        </motion.p>
      </div>
    </div>
  )
}