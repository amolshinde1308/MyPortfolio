import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999,
          width: 10, height: 10, borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          mixBlendMode: 'normal',
        }}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99998,
          width: 36, height: 36, borderRadius: '50%',
          border: '2px solid rgba(168,85,247,0.6)',
          background: 'transparent',
        }}
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.5 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  )
}
