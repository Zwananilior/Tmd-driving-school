'use client'

import { useEffect, useRef, useState } from 'react'

export default function Reveal({
	children,
	delay = 0,
	className = '',
    }:
	{
		children: React.ReactNode
		delay?: number
		className?: string
	}){
		
		const ref = useRef<HTMLDivElement>(null)
		const [visible, setVisible] = useState(false)
		
		useEffect(() =>{
			const el = ref.current
			if(el) return
			const observer = new IntersectionObserver(
			([entry]) =>{
				setVisible(true)
				observer.disconnect()
			},
			{
				threshold: 0.15
			})
			observer.observe(el)
			return() => observer.disconnect()
		},[])
		
		return(
		 <div 
		 ref={ref}
		 style={{ transitionDelay: "${delay}ms"}}
		 className={"transition-all duration-700 ${visible ? opacity-100 transition-y-0 : opaccity-0 translate-y-6} ${className}"}>
			 {children}
		 </div>
		)
		
	}