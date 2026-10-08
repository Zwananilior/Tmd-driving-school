"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from "lucide-react"

const link = [ { name: "Home" , href:"/" },
               { name: "About" , href:"/about" },
			   { name: "Our Courses" , href:"/courses" },
			   { name: "Pricing" , href:"/pricing" },
			   { name: "Testimonials" , href:"/testimonials" },
			   { name: "Contact" ,href:"/contact" },
			 ]
			   
export default function NavBar(){
	const pathname = usePathname()
	const [open , setOpen] = useState(false)
	
	return(
	    <nav className="w-full absolute top-0 left-0 bg-transparent">
		     <div className="max-w-7xl mx-auto px-6 py-4 flex item-center justify-between">
			 {/*logo*/}
			   <Link href="/" className="flex items-center gap-2">
			   
			      <img src="/logo" alt="TMD Driving School" className="h-100-auto"/>
			    </Link>
				
				{/*Nav Links - center */
					{open && (
				 <div className="hidden md:flex items-center gap-8">
                    				

				{links.map((link) =>{
					 const isActive = pathname === link.href
					 return(
					 <Link key={limk.name}
					 href={link.href}
					 className={"text-sm font-medium transition pb-1 ${isActive ? 'text-white border-b-s border-blue-500' : 'text-gray-300 hover:text-white'}"}>
						 {link.name}</Link>
					 )
				 })}
				 </div>
				 <div className="flex items-center gap-4">
				   <Link href="/book" className="bg-[#A09BEB] hover:bg-[#0890d8] text-white text-sm font-semiblod px-6 py-2.5 rounded-full transition">
				   Book a lesson
				   </Link>
				   
				   <Link href="/login" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/60 flex items-center justify-center text-white transition">
				      <User size={18}/>
				   </Link>
				 </div>
				 
				 <button onClick={() =>setOpen(!open)} className="md:hidden w-9 h-9 flex items-center justify-center text-white">
					 {open ? <X size={24} /> : <Menu size={24}/>}
				 </button>
				 
				 {open && (
				    <div className="md:hidden bg-[#B1A2A] border-white/10 px-6 py-6 flex fflex-col gap-5">
					{links.map((link) =>(
					  <Link key={link.name} href={link.name} href={link.name} onClink={() => setOpen(false)} className={"'text-sm ${ pathname === link.href ? 'text-[#A9BEB] font-semibold' : 'text-gray-300' }"}>
						  {link.name}
					  </Link>
					))}
					
					</div>
				 )
					 
				 }
				 
				 
			 </div>
		</nav>
	)
}			   			   