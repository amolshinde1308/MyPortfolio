import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import dotnetCoreImage from '../../imports/.net core image.png'
import azureImage from '../../imports/azure iamge.webp'
import efCoreImage from '../../imports/ef core image.png'
import reactImage from '../../imports/reactjs image.png'
import sqlImage from '../../imports/sql image.png'
import typescriptImage from '../../imports/typescript image.webp'

/* ═══════════════════════════════════════════════════════════════
   PORTRAIT CHARACTER  —  Amol Shinde
   Colours matched to photo:
     skin   = warm medium brown
     hair   = near-black, dome swept right
     beard  = near-black, full
     shirt  = teal / cyan
   Arms hang naturally at sides, NOT in T-pose
═══════════════════════════════════════════════════════════════ */
function PortraitCharacter() {
  const rootRef = useRef()
  const headRef = useRef()
  const lArmRef = useRef()
  const rArmRef = useRef()
  const eyeLRef = useRef()
  const eyeRRef = useRef()
  const blinkState = useRef({ next: 3.5, blinking: false, start: 0 })

  /* ── palette ── */
  const SK = '#b07645'   // skin
  const SKD = '#8a5530'   // skin shadow / nostrils
  const SKH = '#c8976a'   // skin highlight
  const HR = '#140e06'   // hair / brow / beard
  const EY = '#3d2510'   // iris
  const SH = '#2bbfc8'   // shirt teal
  const SHD = '#1a9098'   // shirt dark / collar
  const WHT = '#f2f2f2'

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (rootRef.current) {
      rootRef.current.rotation.y = Math.sin(t * 0.45) * 0.12
      rootRef.current.position.y = Math.sin(t * 0.85) * 0.05
    }
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.35) * 0.035
    }
    /* arm gentle breathing swing */
    if (lArmRef.current) lArmRef.current.rotation.z = 0.18 + Math.sin(t * 0.9) * 0.04
    if (rArmRef.current) rArmRef.current.rotation.z = -0.18 - Math.sin(t * 0.9) * 0.04

    /* blink */
    const b = blinkState.current
    if (!b.blinking && t > b.next) {
      b.blinking = true; b.start = t
      b.next = t + 2.8 + Math.random() * 3.5
    }
    if (b.blinking) {
      const el = t - b.start
      const sc = el < 0.07 ? 1 - el / 0.07 : el < 0.15 ? (el - 0.07) / 0.08 : 1
        ;[eyeLRef, eyeRRef].forEach(r => { if (r.current) r.current.scale.y = Math.max(0.05, sc) })
      if (el > 0.18) b.blinking = false
    }
  })

  return (
    /* scale fits inside the 2.6-unit cube */
    <group ref={rootRef} position={[0, -0.25, 0]} scale={[0.78, 0.78, 0.78]}>

      {/* ══ NECK ══ */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.22, 16]} />
        <meshStandardMaterial color={SK} roughness={0.6} />
      </mesh>

      {/* ══ HEAD ══ */}
      <group ref={headRef} position={[0, 1.02, 0]}>

        {/* skull — slightly taller than wide for natural look */}
        <mesh scale={[1, 1.06, 0.94]}>
          <sphereGeometry args={[0.38, 48, 48]} />
          <meshStandardMaterial color={SK} roughness={0.55} />
        </mesh>

        {/* jaw widening */}
        <mesh position={[0, -0.2, 0.02]} scale={[1.0, 0.55, 0.9]}>
          <sphereGeometry args={[0.34, 32, 24]} />
          <meshStandardMaterial color={SK} roughness={0.58} />
        </mesh>

        {/* cheek blush L */}
        <mesh position={[-0.22, 0.02, 0.3]} scale={[0.65, 0.5, 0.3]}>
          <sphereGeometry args={[0.15, 16, 12]} />
          <meshStandardMaterial color={SKH} roughness={0.55} transparent opacity={0.45} />
        </mesh>
        {/* cheek blush R */}
        <mesh position={[0.22, 0.02, 0.3]} scale={[0.65, 0.5, 0.3]}>
          <sphereGeometry args={[0.15, 16, 12]} />
          <meshStandardMaterial color={SKH} roughness={0.55} transparent opacity={0.45} />
        </mesh>

        {/* ── HAIR ──
             dome cap covering top + back of skull
             slight rightward sweep on front fringe              */}
        {/* main dome */}
        <mesh position={[0.02, 0.16, -0.02]} scale={[1.05, 0.7, 1.04]}>
          <sphereGeometry args={[0.385, 36, 36]} />
          <meshStandardMaterial color={HR} roughness={0.85} />
        </mesh>
        {/* right-side sweep volume */}
        <mesh position={[0.19, 0.22, 0.06]} rotation={[0.04, -0.22, 0.5]} scale={[1.1, 0.38, 0.72]}>
          <sphereGeometry args={[0.25, 24, 18]} />
          <meshStandardMaterial color={HR} roughness={0.85} />
        </mesh>
        {/* front fringe dip */}
        <mesh position={[0.04, 0.36, 0.28]} rotation={[-0.3, 0.08, 0.15]} scale={[1.2, 0.26, 0.58]}>
          <sphereGeometry args={[0.22, 20, 14]} />
          <meshStandardMaterial color={HR} roughness={0.83} />
        </mesh>
        {/* left side flat */}
        <mesh position={[-0.2, 0.18, -0.02]} rotation={[0, 0.12, -0.38]} scale={[0.68, 0.44, 0.72]}>
          <sphereGeometry args={[0.24, 20, 16]} />
          <meshStandardMaterial color={HR} roughness={0.87} />
        </mesh>
        {/* back of head hair */}
        <mesh position={[0, 0.06, -0.3]} scale={[0.97, 0.88, 0.46]}>
          <sphereGeometry args={[0.38, 24, 18]} />
          <meshStandardMaterial color={HR} roughness={0.88} />
        </mesh>

        {/* ── EYEBROWS — thick ── */}
        <mesh position={[-0.15, 0.2, 0.33]} rotation={[0, 0, 0.13]} scale={[1.6, 0.28, 0.24]}>
          <capsuleGeometry args={[0.038, 0.08, 6, 12]} />
          <meshStandardMaterial color={HR} roughness={0.85} />
        </mesh>
        <mesh position={[0.15, 0.2, 0.33]} rotation={[0, 0, -0.13]} scale={[1.6, 0.28, 0.24]}>
          <capsuleGeometry args={[0.038, 0.08, 6, 12]} />
          <meshStandardMaterial color={HR} roughness={0.85} />
        </mesh>

        {/* ── EYES ── */}
        {/* whites */}
        <mesh ref={eyeLRef} position={[-0.145, 0.1, 0.345]} scale={[1.5, 0.82, 0.42]}>
          <sphereGeometry args={[0.055, 18, 14]} />
          <meshStandardMaterial color={WHT} roughness={0.25} />
        </mesh>
        <mesh ref={eyeRRef} position={[0.145, 0.1, 0.345]} scale={[1.5, 0.82, 0.42]}>
          <sphereGeometry args={[0.055, 18, 14]} />
          <meshStandardMaterial color={WHT} roughness={0.25} />
        </mesh>
        {/* irises */}
        <mesh position={[-0.145, 0.1, 0.372]} scale={[0.95, 0.72, 0.22]}>
          <sphereGeometry args={[0.038, 14, 10]} />
          <meshStandardMaterial color={EY} roughness={0.18} />
        </mesh>
        <mesh position={[0.145, 0.1, 0.372]} scale={[0.95, 0.72, 0.22]}>
          <sphereGeometry args={[0.038, 14, 10]} />
          <meshStandardMaterial color={EY} roughness={0.18} />
        </mesh>
        {/* pupils */}
        <mesh position={[-0.145, 0.1, 0.385]}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial color="#080402" />
        </mesh>
        <mesh position={[0.145, 0.1, 0.385]}>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial color="#080402" />
        </mesh>
        {/* upper lid lines */}
        <mesh position={[-0.145, 0.122, 0.383]} scale={[1.55, 0.18, 0.14]}>
          <sphereGeometry args={[0.05, 12, 8]} />
          <meshStandardMaterial color={HR} roughness={0.9} transparent opacity={0.75} />
        </mesh>
        <mesh position={[0.145, 0.122, 0.383]} scale={[1.55, 0.18, 0.14]}>
          <sphereGeometry args={[0.05, 12, 8]} />
          <meshStandardMaterial color={HR} roughness={0.9} transparent opacity={0.75} />
        </mesh>

        {/* ── NOSE ── */}
        <mesh position={[0, 0.04, 0.358]} scale={[0.42, 0.95, 0.38]}>
          <capsuleGeometry args={[0.028, 0.07, 6, 12]} />
          <meshStandardMaterial color={SK} roughness={0.62} />
        </mesh>
        <mesh position={[0, -0.04, 0.376]} scale={[1.05, 0.68, 0.76]}>
          <sphereGeometry args={[0.052, 16, 12]} />
          <meshStandardMaterial color={SKD} roughness={0.65} />
        </mesh>
        {/* nostrils */}
        <mesh position={[-0.052, -0.046, 0.368]} scale={[0.52, 0.4, 0.48]}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshStandardMaterial color={SKD} roughness={0.7} />
        </mesh>
        <mesh position={[0.052, -0.046, 0.368]} scale={[0.52, 0.4, 0.48]}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshStandardMaterial color={SKD} roughness={0.7} />
        </mesh>

        {/* ── MOUSTACHE ── thick, sits between nose & lip */}
        <mesh position={[-0.075, -0.1, 0.362]} rotation={[0.05, 0.05, 0.18]} scale={[1.5, 0.42, 0.5]}>
          <sphereGeometry args={[0.066, 16, 10]} />
          <meshStandardMaterial color={HR} roughness={0.88} />
        </mesh>
        <mesh position={[0.075, -0.1, 0.362]} rotation={[0.05, -0.05, -0.18]} scale={[1.5, 0.42, 0.5]}>
          <sphereGeometry args={[0.066, 16, 10]} />
          <meshStandardMaterial color={HR} roughness={0.88} />
        </mesh>
        <mesh position={[0, -0.105, 0.358]} scale={[0.55, 0.28, 0.38]}>
          <sphereGeometry args={[0.05, 12, 8]} />
          <meshStandardMaterial color={HR} roughness={0.88} />
        </mesh>

        {/* ── LIPS ── */}
        <mesh position={[0, -0.14, 0.356]} scale={[1.6, 0.32, 0.42]}>
          <sphereGeometry args={[0.048, 14, 10]} />
          <meshStandardMaterial color={SKD} roughness={0.62} />
        </mesh>
        <mesh position={[0, -0.168, 0.362]} scale={[1.65, 0.42, 0.48]}>
          <sphereGeometry args={[0.05, 14, 10]} />
          <meshStandardMaterial color={SK} roughness={0.6} />
        </mesh>

        {/* ── BEARD — full, dense ── */}
        {/* chin central mass */}
        <mesh position={[0, -0.33, 0.23]} scale={[1.02, 0.82, 0.72]}>
          <sphereGeometry args={[0.24, 28, 18]} />
          <meshStandardMaterial color={HR} roughness={0.9} />
        </mesh>
        {/* side L */}
        <mesh position={[-0.24, -0.23, 0.18]} rotation={[0.08, 0.14, 0.22]} scale={[0.72, 0.92, 0.68]}>
          <sphereGeometry args={[0.2, 22, 14]} />
          <meshStandardMaterial color={HR} roughness={0.9} />
        </mesh>
        {/* side R */}
        <mesh position={[0.24, -0.23, 0.18]} rotation={[0.08, -0.14, -0.22]} scale={[0.72, 0.92, 0.68]}>
          <sphereGeometry args={[0.2, 22, 14]} />
          <meshStandardMaterial color={HR} roughness={0.9} />
        </mesh>
        {/* under chin */}
        <mesh position={[0, -0.375, 0.1]} scale={[0.88, 0.45, 0.58]}>
          <sphereGeometry args={[0.2, 18, 14]} />
          <meshStandardMaterial color={HR} roughness={0.92} />
        </mesh>
        {/* cheek stubble L */}
        <mesh position={[-0.27, -0.12, 0.26]} scale={[0.58, 0.52, 0.36]}>
          <sphereGeometry args={[0.11, 14, 10]} />
          <meshStandardMaterial color={HR} roughness={0.92} transparent opacity={0.7} />
        </mesh>
        {/* cheek stubble R */}
        <mesh position={[0.27, -0.12, 0.26]} scale={[0.58, 0.52, 0.36]}>
          <sphereGeometry args={[0.11, 14, 10]} />
          <meshStandardMaterial color={HR} roughness={0.92} transparent opacity={0.7} />
        </mesh>

        {/* ── EARS ── */}
        <mesh position={[-0.382, 0.06, -0.03]} scale={[0.3, 0.66, 0.4]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          <meshStandardMaterial color={SK} roughness={0.6} />
        </mesh>
        <mesh position={[-0.4, 0.06, -0.03]} scale={[0.18, 0.48, 0.28]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshStandardMaterial color={SKD} roughness={0.65} />
        </mesh>
        <mesh position={[0.382, 0.06, -0.03]} scale={[0.3, 0.66, 0.4]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          <meshStandardMaterial color={SK} roughness={0.6} />
        </mesh>
        <mesh position={[0.4, 0.06, -0.03]} scale={[0.18, 0.48, 0.28]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshStandardMaterial color={SKD} roughness={0.65} />
        </mesh>

      </group>{/* end headRef */}

      {/* ══ TORSO — teal shirt ══ */}
      <mesh position={[0, 0.18, 0]} scale={[0.88, 1.0, 0.52]}>
        <capsuleGeometry args={[0.36, 0.55, 12, 24]} />
        <meshStandardMaterial color={SH} roughness={0.46} metalness={0.03} />
      </mesh>
      {/* shirt front shading */}
      <mesh position={[0, 0.22, 0.3]} scale={[0.52, 0.8, 0.12]}>
        <sphereGeometry args={[0.3, 20, 12]} />
        <meshStandardMaterial color={SHD} roughness={0.52} transparent opacity={0.38} />
      </mesh>

      {/* ── V-COLLAR ── */}
      <mesh position={[-0.08, 0.64, 0.26]} rotation={[0, 0, 0.52]} scale={[0.65, 1.45, 0.24]}>
        <boxGeometry args={[0.12, 0.24, 0.04]} />
        <meshStandardMaterial color={SHD} roughness={0.5} />
      </mesh>
      <mesh position={[0.08, 0.64, 0.26]} rotation={[0, 0, -0.52]} scale={[0.65, 1.45, 0.24]}>
        <boxGeometry args={[0.12, 0.24, 0.04]} />
        <meshStandardMaterial color={SHD} roughness={0.5} />
      </mesh>
      {/* collar button */}
      <mesh position={[0, 0.54, 0.28]}>
        <sphereGeometry args={[0.026, 10, 10]} />
        <meshStandardMaterial color={WHT} roughness={0.4} />
      </mesh>

      {/* ══ LEFT ARM — hangs naturally at side ══ */}
      <group ref={lArmRef} position={[-0.42, 0.18, 0]}>
        {/* upper arm — shirt sleeve */}
        <mesh position={[-0.12, -0.12, 0]} rotation={[0, 0, 0.18]}>
          <capsuleGeometry args={[0.1, 0.4, 10, 16]} />
          <meshStandardMaterial color={SH} roughness={0.48} />
        </mesh>
        {/* elbow */}
        <mesh position={[-0.22, -0.4, 0]}>
          <sphereGeometry args={[0.09, 12, 10]} />
          <meshStandardMaterial color={SH} roughness={0.48} />
        </mesh>
        {/* forearm — skin */}
        <mesh position={[-0.26, -0.64, 0.04]} rotation={[0.05, 0, 0.12]}>
          <capsuleGeometry args={[0.082, 0.36, 10, 16]} />
          <meshStandardMaterial color={SK} roughness={0.58} />
        </mesh>
        {/* hand */}
        <mesh position={[-0.29, -0.9, 0.06]} scale={[1.0, 0.72, 0.52]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          <meshStandardMaterial color={SK} roughness={0.56} />
        </mesh>
      </group>

      {/* ══ RIGHT ARM — mirror ══ */}
      <group ref={rArmRef} position={[0.42, 0.18, 0]}>
        <mesh position={[0.12, -0.12, 0]} rotation={[0, 0, -0.18]}>
          <capsuleGeometry args={[0.1, 0.4, 10, 16]} />
          <meshStandardMaterial color={SH} roughness={0.48} />
        </mesh>
        <mesh position={[0.22, -0.4, 0]}>
          <sphereGeometry args={[0.09, 12, 10]} />
          <meshStandardMaterial color={SH} roughness={0.48} />
        </mesh>
        <mesh position={[0.26, -0.64, 0.04]} rotation={[0.05, 0, -0.12]}>
          <capsuleGeometry args={[0.082, 0.36, 10, 16]} />
          <meshStandardMaterial color={SK} roughness={0.58} />
        </mesh>
        <mesh position={[0.29, -0.9, 0.06]} scale={[1.0, 0.72, 0.52]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          <meshStandardMaterial color={SK} roughness={0.56} />
        </mesh>
      </group>

      {/* ══ WAIST / HIP ══ */}
      <mesh position={[0, -0.5, 0]} scale={[0.84, 0.38, 0.5]}>
        <capsuleGeometry args={[0.36, 0.18, 8, 16]} />
        <meshStandardMaterial color={SHD} roughness={0.55} />
      </mesh>

    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CUBE CAGE + CHARACTER
═══════════════════════════════════════════════════════════════ */
function ReferencePortraitCharacter() {
  const rootRef = useRef()
  const headRef = useRef()
  const eyeLRef = useRef()
  const eyeRRef = useRef()
  const blinkRef = useRef({ next: 2.4, start: 0, active: false })

  const skin = '#ad754f'
  const skinShade = '#895337'
  const skinLight = '#c58d68'
  const hair = '#0f0c0b'
  const beard = '#15100e'
  const shirt = '#39c3cf'
  const shirtDark = '#198d98'
  const eye = '#3a2317'

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (rootRef.current) {
      rootRef.current.position.y = -0.18 + Math.sin(t * 0.9) * 0.035
      rootRef.current.rotation.y = Math.sin(t * 0.5) * 0.08
    }

    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.35) * 0.025
    }

    const blink = blinkRef.current
    if (!blink.active && t > blink.next) {
      blink.active = true
      blink.start = t
      blink.next = t + 2.6 + Math.random() * 3
    }

    if (blink.active) {
      const elapsed = t - blink.start
      const close = elapsed < 0.07 ? 1 - elapsed / 0.07 : (elapsed - 0.07) / 0.09
      const scaleY = Math.max(0.06, Math.min(1, close))
      if (eyeLRef.current) eyeLRef.current.scale.y = scaleY
      if (eyeRRef.current) eyeRRef.current.scale.y = scaleY
      if (elapsed > 0.18) blink.active = false
    }
  })

  return (
    <group ref={rootRef} position={[0, -0.18, 0]} scale={[1.15, 1.15, 1.15]}>
      <mesh position={[0, -0.72, 0]} scale={[1.15, 0.9, 0.5]}>
        <capsuleGeometry args={[0.45, 0.55, 12, 28]} />
        <meshStandardMaterial color={shirt} roughness={0.48} metalness={0.02} />
      </mesh>

      <mesh position={[0, -0.23, 0.12]} scale={[0.48, 1.2, 0.12]}>
        <boxGeometry args={[0.08, 0.42, 0.035]} />
        <meshStandardMaterial color="#dffbff" roughness={0.42} />
      </mesh>
      {[0.0, -0.17, -0.34].map((y) => (
        <mesh key={y} position={[0, y - 0.18, 0.2]}>
          <sphereGeometry args={[0.026, 12, 12]} />
          <meshStandardMaterial color="#f7fafc" roughness={0.35} />
        </mesh>
      ))}

      <mesh position={[-0.2, -0.1, 0.15]} rotation={[0, 0, 0.55]} scale={[0.9, 1.7, 0.16]}>
        <boxGeometry args={[0.13, 0.32, 0.05]} />
        <meshStandardMaterial color={shirtDark} roughness={0.5} />
      </mesh>
      <mesh position={[0.2, -0.1, 0.15]} rotation={[0, 0, -0.55]} scale={[0.9, 1.7, 0.16]}>
        <boxGeometry args={[0.13, 0.32, 0.05]} />
        <meshStandardMaterial color={shirtDark} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.22, 18]} />
        <meshStandardMaterial color={skin} roughness={0.58} />
      </mesh>

      <group ref={headRef} position={[0, 0.52, 0]}>
        <mesh position={[0, 0.02, 0]} scale={[0.88, 1.05, 0.76]}>
          <sphereGeometry args={[0.48, 48, 48]} />
          <meshStandardMaterial color={skin} roughness={0.56} />
        </mesh>
        <mesh position={[0, -0.29, 0.03]} scale={[0.92, 0.55, 0.74]}>
          <sphereGeometry args={[0.42, 32, 24]} />
          <meshStandardMaterial color={skin} roughness={0.58} />
        </mesh>

        <mesh position={[0.02, 0.34, -0.04]} scale={[0.96, 0.52, 0.8]}>
          <sphereGeometry args={[0.48, 36, 28]} />
          <meshStandardMaterial color={hair} roughness={0.88} />
        </mesh>
        <mesh position={[-0.16, 0.42, 0.24]} rotation={[-0.12, 0.18, -0.25]} scale={[1.4, 0.38, 0.62]}>
          <sphereGeometry args={[0.24, 24, 18]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[0.17, 0.36, 0.18]} rotation={[-0.08, -0.24, 0.5]} scale={[1.15, 0.42, 0.66]}>
          <sphereGeometry args={[0.25, 24, 18]} />
          <meshStandardMaterial color={hair} roughness={0.88} />
        </mesh>
        <mesh position={[-0.33, 0.18, -0.03]} rotation={[0, 0, -0.22]} scale={[0.48, 0.88, 0.5]}>
          <sphereGeometry args={[0.23, 18, 14]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[0.34, 0.15, -0.04]} rotation={[0, 0, 0.2]} scale={[0.42, 0.82, 0.5]}>
          <sphereGeometry args={[0.22, 18, 14]} />
          <meshStandardMaterial color={hair} roughness={0.9} />
        </mesh>

        <mesh position={[-0.47, -0.02, -0.02]} scale={[0.32, 0.68, 0.42]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>
        <mesh position={[0.47, -0.02, -0.02]} scale={[0.32, 0.68, 0.42]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          <meshStandardMaterial color={skin} roughness={0.6} />
        </mesh>

        <mesh position={[-0.16, 0.13, 0.39]} rotation={[0, 0, 0.1]} scale={[1.95, 0.26, 0.24]}>
          <capsuleGeometry args={[0.04, 0.12, 8, 14]} />
          <meshStandardMaterial color={hair} roughness={0.88} />
        </mesh>
        <mesh position={[0.16, 0.13, 0.39]} rotation={[0, 0, -0.1]} scale={[1.95, 0.26, 0.24]}>
          <capsuleGeometry args={[0.04, 0.12, 8, 14]} />
          <meshStandardMaterial color={hair} roughness={0.88} />
        </mesh>

        <mesh ref={eyeLRef} position={[-0.16, 0.02, 0.42]} scale={[1.55, 0.82, 0.34]}>
          <sphereGeometry args={[0.06, 18, 14]} />
          <meshStandardMaterial color="#fffaf2" roughness={0.25} />
        </mesh>
        <mesh ref={eyeRRef} position={[0.16, 0.02, 0.42]} scale={[1.55, 0.82, 0.34]}>
          <sphereGeometry args={[0.06, 18, 14]} />
          <meshStandardMaterial color="#fffaf2" roughness={0.25} />
        </mesh>
        <mesh position={[-0.16, 0.02, 0.45]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color={eye} roughness={0.18} />
        </mesh>
        <mesh position={[0.16, 0.02, 0.45]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color={eye} roughness={0.18} />
        </mesh>

        <mesh position={[0, -0.06, 0.44]} scale={[0.42, 1, 0.38]}>
          <capsuleGeometry args={[0.035, 0.11, 8, 14]} />
          <meshStandardMaterial color={skinLight} roughness={0.58} />
        </mesh>
        <mesh position={[0, -0.14, 0.46]} scale={[1, 0.52, 0.5]}>
          <sphereGeometry args={[0.065, 14, 10]} />
          <meshStandardMaterial color={skinShade} roughness={0.62} />
        </mesh>

        <mesh position={[-0.08, -0.21, 0.44]} rotation={[0.04, 0, 0.18]} scale={[1.55, 0.42, 0.42]}>
          <sphereGeometry args={[0.07, 16, 10]} />
          <meshStandardMaterial color={beard} roughness={0.9} />
        </mesh>
        <mesh position={[0.08, -0.21, 0.44]} rotation={[0.04, 0, -0.18]} scale={[1.55, 0.42, 0.42]}>
          <sphereGeometry args={[0.07, 16, 10]} />
          <meshStandardMaterial color={beard} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.26, 0.44]} scale={[1.45, 0.28, 0.32]}>
          <sphereGeometry args={[0.052, 14, 10]} />
          <meshStandardMaterial color={skinShade} roughness={0.58} />
        </mesh>

        <mesh position={[0, -0.43, 0.3]} scale={[1, 0.88, 0.7]}>
          <sphereGeometry args={[0.31, 28, 20]} />
          <meshStandardMaterial color={beard} roughness={0.92} />
        </mesh>
        <mesh position={[-0.31, -0.3, 0.25]} scale={[0.58, 0.86, 0.58]}>
          <sphereGeometry args={[0.22, 22, 16]} />
          <meshStandardMaterial color={beard} roughness={0.92} />
        </mesh>
        <mesh position={[0.31, -0.3, 0.25]} scale={[0.58, 0.86, 0.58]}>
          <sphereGeometry args={[0.22, 22, 16]} />
          <meshStandardMaterial color={beard} roughness={0.92} />
        </mesh>
      </group>
    </group>
  )
}

function CodeCube() {
  const cubeRef = useRef()
  const [textures, setTextures] = useState([])

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const urls = [
      typescriptImage,
      reactImage,
      azureImage,
      sqlImage,
      efCoreImage,
      dotnetCoreImage,
    ]

    Promise.all(
      urls.map(url => new Promise(resolve => {
        loader.load(
          url,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace
            resolve(tex)
          },
          undefined,
          (err) => {
            console.warn('Missing texture:', url, err)
            resolve(null)
          }
        )
      }))
    ).then(setTextures)
  }, [])

  useFrame((state) => {
    /* very slow Y rotation so face stays legible */
    if (cubeRef.current) cubeRef.current.rotation.y = state.clock.elapsedTime * 0.14
  })

  const cubeGeo = useMemo(() => new THREE.BoxGeometry(2.6, 2.6, 2.6), [])

  const corners = useMemo(() => {
    const s = 1.3, pts = []
    for (const x of [-s, s]) for (const y of [-s, s]) for (const z of [-s, s]) pts.push([x, y, z])
    return pts
  }, [])

  return (
    <Float speed={1.0} rotationIntensity={0.04} floatIntensity={0.5}>
      <group ref={cubeRef}>
        {/* textured faces */}
        <mesh geometry={cubeGeo}>
          {textures.length === 6 ? textures.map((tex, i) => (
            tex ? (
              <meshStandardMaterial
                key={i}
                attach={`material-${i}`}
                map={tex}
                roughness={0.4}
                metalness={0.1}
                color="#ffffff"
              />
            ) : (
              <meshStandardMaterial
                key={i}
                attach={`material-${i}`}
                color="#a855f7"
                transparent
                opacity={0.15}
                roughness={0.2}
                metalness={0.9}
                side={THREE.DoubleSide}
              />
            )
          )) : (
            <meshStandardMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.06} roughness={0.2} metalness={0.9} />
          )}
        </mesh>

        {/* glowing wireframe edges — spin slowly */}
        <lineSegments>
          <edgesGeometry args={[cubeGeo]} />
          <lineBasicMaterial color="#a855f7" transparent opacity={0.82} />
        </lineSegments>

        {/* corner gems */}
        {corners.map((c, i) => (
          <mesh key={i} position={c}>
            {/* <sphereGeometry args={[0.046, 8, 8]} /> */}
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={2.2} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND — spheres, DNA, particles
═══════════════════════════════════════════════════════════════ */
function AnimatedSphere({ position, color, size }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.008
    ref.current.rotation.y += 0.012
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.4
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}

function DNAHelix() {
  const group = useRef()
  const pts = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const t = (i / 20) * Math.PI * 3
    return {
      a: [Math.cos(t) * 1.2, (i / 20) * 4 - 2, Math.sin(t) * 1.2],
      b: [Math.cos(t + Math.PI) * 1.2, (i / 20) * 4 - 2, Math.sin(t + Math.PI) * 1.2],
    }
  }), [])
  useFrame(({ clock }) => { if (group.current) group.current.rotation.y = clock.elapsedTime * 0.4 })
  return (
    <group ref={group} position={[-5, 0, -1.5]}>
      {pts.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Particles({ count = 180 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [count])
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.04
      ref.current.rotation.x = clock.elapsedTime * 0.02
    }
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ec4899" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export function ThreeScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.3, 7.5], fov: 52 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* ── Lighting ── warm key + cool fill + purple rim */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]} intensity={1.5} color="#fff6ec" />
        <directionalLight position={[-5, 4, 4]} intensity={0.6} color="#c8e8ff" />
        <pointLight position={[0, 5, 4]} intensity={1.4} color="#a855f7" />
        <pointLight position={[0, -4, 3]} intensity={0.7} color="#ec4899" />
        <pointLight position={[-5, 1, 3]} intensity={0.6} color="#2bbfc8" />

        <Stars radius={40} depth={40} count={800} factor={3} saturation={0} fade speed={0.5} />

        <CodeCube />

        <AnimatedSphere position={[-4.5, 0.5, 0.3]} color="#ec4899" size={1.5} />
        <AnimatedSphere position={[3.2, -1.5, -1.0]} color="#3b82f6" size={0.90} />
        <AnimatedSphere position={[0.0, 2.8, -3.0]} color="#a855f7" size={0.55} />
        {/* <DNAHelix /> */}
        <Particles count={150} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  )
}
