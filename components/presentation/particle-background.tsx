"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number       // velocidad horizontal (viento)
  vy: number       // velocidad vertical base
  size: number
  opacity: number
  phase: number    // offset senoidal para ondulación
  freq: number     // frecuencia de ondulación
  rotation: number
  vr: number       // velocidad de rotación
  amp: number      // amplitud de la ondulación lateral
}

function createParticles(W: number, H: number): Particle[] {
  const particles: Particle[] = []
  let seed = 73
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }

  // Tier 1 — grandes, lentas (0.15–0.3 vx)
  for (let i = 0; i < 7; i++) {
    particles.push({ x: rand()*W, y: rand()*H, vx: 0.15+rand()*0.15, vy:-(0.02+rand()*0.06),
      size: 36+rand()*18, opacity: 0.13+rand()*0.07,
      phase: rand()*Math.PI*2, freq: 0.3+rand()*0.3,
      rotation: rand()*Math.PI*2, vr: (rand()-0.5)*0.006, amp: 0.6+rand()*0.8 })
  }
  // Tier 2 — medianas, velocidad media (0.4–0.65 vx)
  for (let i = 0; i < 7; i++) {
    particles.push({ x: rand()*W, y: rand()*H, vx: 0.4+rand()*0.25, vy:-(0.05+rand()*0.1),
      size: 18+rand()*12, opacity: 0.07+rand()*0.05,
      phase: rand()*Math.PI*2, freq: 0.5+rand()*0.5,
      rotation: rand()*Math.PI*2, vr: (rand()-0.5)*0.009, amp: 0.4+rand()*0.6 })
  }
  // Tier 3 — pequeñas, rápidas (0.8–1.3 vx)
  for (let i = 0; i < 6; i++) {
    particles.push({ x: rand()*W, y: rand()*H, vx: 0.8+rand()*0.5, vy:-(0.08+rand()*0.12),
      size: 8+rand()*8, opacity: 0.03+rand()*0.04,
      phase: rand()*Math.PI*2, freq: 0.7+rand()*0.6,
      rotation: rand()*Math.PI*2, vr: (rand()-0.5)*0.014, amp: 0.2+rand()*0.4 })
  }
  return particles
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const imgRef = useRef<HTMLImageElement | null>(null)
  const imgLoadedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Cargar logo
    const img = new Image()
    img.src = "/images/6.png"
    img.onload = () => {
      imgRef.current = img
      imgLoadedRef.current = true
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      particlesRef.current = createParticles(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (imgLoadedRef.current && imgRef.current) {
        const img = imgRef.current

        for (const p of particlesRef.current) {
          // Ondulación vertical tipo viento
          const sway = Math.sin(t * p.freq + p.phase) * p.amp

          // Mover
          p.x += p.vx
          p.y += p.vy + sway * 0.04
          p.rotation += p.vr

          // Wrap: si sale por la derecha, reaparece por la izquierda
          if (p.x > canvas.width + p.size) {
            p.x = -p.size
            p.y = Math.random() * canvas.height
          }
          if (p.y < -p.size) p.y = canvas.height + p.size
          if (p.y > canvas.height + p.size) p.y = -p.size

          ctx.save()
          ctx.globalAlpha = p.opacity
          ctx.translate(p.x, p.y + sway)
          ctx.rotate(p.rotation)
          ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }
      }

      t += 0.016
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  )
}
