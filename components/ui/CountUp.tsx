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
const spanRef = useRef<HTMLSpanElement | null>(null)
const [value, setValue] = useState(0)

useEffect(() => {
const element: HTMLSpanElement | null = spanRef.current

```
if (element === null) return

let animationFrame = 0
let hasAnimated = false

const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting || hasAnimated) return

    hasAnimated = true
    observer.disconnect()

    const startTime = performance.now()
    const animationDuration = Math.max(duration, 0)

    const animate = (currentTime: number) => {
      const progress =
        animationDuration === 0
          ? 1
          : Math.min(
              (currentTime - startTime) / animationDuration,
              1
            )

      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setValue(Math.round(end * easedProgress))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
  },
  { threshold: 0.4 }
)

observer.observe(element)

return () => {
  observer.disconnect()
  cancelAnimationFrame(animationFrame)
}
```

}, [end, duration])

return ( <span ref={spanRef}>
{value.toLocaleString()}
{suffix} </span>
)
}
