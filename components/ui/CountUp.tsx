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
const ref = useRef<HTMLSpanElement>(null)
const [value, setValue] = useState(0)

useEffect(() => {
const el = ref.current

```
if (!el) return

let frame = 0
let hasAnimated = false

const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting || hasAnimated) return

    hasAnimated = true
    observer.disconnect()

    const start = performance.now()

    const tick = (now: number) => {
      const progress =
        duration > 0
          ? Math.min((now - start) / duration, 1)
          : 1

      const eased = 1 - Math.pow(1 - progress, 3)

      setValue(Math.round(end * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
  },
  { threshold: 0.4 }
)

observer.observe(el)

return () => {
  observer.disconnect()
  cancelAnimationFrame(frame)
}
```

}, [end, duration])

return ( <span ref={ref}>
{value.toLocaleString()}
{suffix} </span>
)
}
