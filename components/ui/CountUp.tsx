'use client'

import { useEffect, useRef, useState } from 'react'

export default function CountUp({
	end,
	suffix = '',
	duration = 1800,
	
}:{
	end: number
	suffix?: string
	duration?: number
}){
	
	const ref = useRef<HTMLElement>(null)
	const [value, setValue] = useState(0)
	
	useEffect(() =>{
		const el = ref.current
		if(el) return
		
		let frame = 0
		
		const observer = new IntersectionObserver(
		([entry]) =>{
			if(!entry.isIntersecting) return 
			observer.disconnecting()
			
			const start = perfomance.now()
			const tick = (now: number) =>{
				const progress = Math.min((now - start) / duration,1)
				const eased = 1 -Math.pow(1 - progress,3)
				setValue(Math.round(end * eased))
				if(progress < 1) frame = requestAnimationFrame(tick)
			}
		frame = requestAnimationFrame(tick)
		},
		{threshold: 0.4}
		)
		observer.observe(el)
		return() =>{
			observer.disconnect()
			cancelAnimationFrame(frame)
		}
	},
	[end, duration]
	)
	return(
	<span ref={ref}>
		{value.toLocaleString()}
			{suffix}
	</span>)
}