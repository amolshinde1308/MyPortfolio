import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import welcomeEmoji from '../../imports/welcome-emoji.avif'

const clamp01 = (value) => Math.min(Math.max(value, 0), 1)
const easeOutBack = (value) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2)
}
const easeInCubic = (value) => value * value * value

function WelcomeModel({ onComplete }) {
  const groupRef = useRef(null)
  const panelRef = useRef(null)
  const emojiMaterialRef = useRef(null)
  const textRef = useRef(null)
  const completedRef = useRef(false)
  const startedAtRef = useRef(null)
  const texture = useTexture(welcomeEmoji)
  const { viewport } = useThree()

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
  }, [texture])

  useFrame(() => {
    if (startedAtRef.current === null) {
      startedAtRef.current = performance.now()
    }

    const elapsed = (performance.now() - startedAtRef.current) / 1000
    const intro = clamp01(elapsed / 0.7)
    const outro = clamp01((elapsed - 2.15) / 0.55)
    const rise = easeOutBack(intro)
    const exit = easeInCubic(outro)
    const opacity = 1 - outro

    if (groupRef.current) {
      const startY = -viewport.height / 2 - 1.25
      const restingY = -viewport.height / 2 + (viewport.width < 4.8 ? 1.05 : 1.15)
      groupRef.current.position.y = THREE.MathUtils.lerp(startY, restingY, rise) + exit * 0.75
      groupRef.current.rotation.z = THREE.MathUtils.lerp(-0.08, 0, rise)
      groupRef.current.scale.setScalar((0.84 + rise * 0.16) * (1 - outro * 0.08))
    }

    if (panelRef.current) panelRef.current.material.opacity = 0.82 * opacity
    if (emojiMaterialRef.current) emojiMaterialRef.current.opacity = opacity
    if (textRef.current?.material) textRef.current.material.opacity = opacity

    if (elapsed > 2.82 && !completedRef.current) {
      completedRef.current = true
      onComplete()
    }
  })

  const compact = viewport.width < 4.8
  const panelWidth = Math.min(viewport.width * 0.9, compact ? 3.35 : 4.7)
  const panelHeight = compact ? 1.1 : 1.18
  const emojiSize = compact ? 0.82 : 0.98
  const textSize = compact ? 0.15 : 0.22
  const emojiX = compact ? -0.95 : -1.45
  const textX = compact ? 0.42 : 0.48
  return (
    <group ref={groupRef}>
      <mesh ref={panelRef} position={[0, 0, -0.04]}>
        <planeGeometry args={[panelWidth, panelHeight]} />
        <meshBasicMaterial color="#090f1f" transparent opacity={0.82} depthWrite={false} />
      </mesh>

      <mesh position={[emojiX, 0, 0]}>
        <planeGeometry args={[emojiSize, emojiSize]} />
        <meshBasicMaterial
          ref={emojiMaterialRef}
          map={texture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      <Text
        ref={textRef}
        position={[textX, compact ? 0.05 : 0.08, 0.02]}
        fontSize={textSize}
        maxWidth={compact ? 1.75 : 3}
        lineHeight={1.12}
        anchorX="center"
        anchorY="middle"
        color="#f9fafb"
        fillOpacity={1}
        material-transparent
        material-depthWrite={false}
        textAlign="center"
      >
        Welcome to my world..!
      </Text>
    </group>
  )
}

export function WelcomeOverlay() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 8], zoom: 100 }}
        gl={{ alpha: true, antialias: true }}
      >
        <WelcomeModel onComplete={() => setVisible(false)} />
      </Canvas>
    </div>
  )
}
