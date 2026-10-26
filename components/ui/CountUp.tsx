
'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  duration?: number
}

export default function CountUp({
  end,
  suffix = '',
  duration = 1800,
}: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    let animationFrame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        observer.disconnect()

        const startTime = window.performance.now()

        const animate = (currentTime: number) => {
          const progress =
            duration <= 0
              ? 1
              : Math.min(
                  (currentTime - startTime) / duration,
                  1
                )

          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setValue(Math.round(end * easedProgress))

          if (progress < 1) {
            animationFrame =
              window.requestAnimationFrame(animate)
          }
        }

        animationFrame = window.requestAnimationFrame(animate)
      },
      { threshold: 0.4 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [end, duration])

  return (
    <span ref={elementRef}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

