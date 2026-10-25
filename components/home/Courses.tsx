import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const courses = [
                {
                 title: 'Beginner Lesson',
				 text: 'Start your driving journey with confidence.',
				 icon: (
				 <>
				   <path d="M5 16l1.5-5a2 2 0 0 1 1.9-1.4h7.2a2 2 0 0 1 1.9 1.4L19 16" />
				   <rect x="3" y="16" width="18" height="4" rx="1.5" />
				   <circle cx="7.5" cy="18" r="0.8"/>
				   <circle cx="16.5" cy="18" r="0.8"/>
				 </>
				 ),
				},
 
{
                 title: 'Refresh Courses',
				 text: 'Build your skills and regain confidence.',
				 icon: (
				 <>
				   <circle cx="12" cy="12" r="10"/>
				   <circle cx="12" cy="12" r="2.5"/>
				   <line x1="12" y1="14.5" x2="12" y2="22" />
				   <line x1="9.8" y1="10.8" x2="3" y2="9" />
				   <line x1="14.2" y1="10.8" x2="21" y2="9" />
				 </>
				 ),
				},
				
				{
                 title: 'Test Preparation',
				 text: 'Get ready for your license test with expert guidance.',
				 icon: (
				 <>
				   <rect x="2" y="5" width="20" height="14" rx="2"/>
				   <circle cx="8" cy="11" r="2"/>
				   <path d="M5 16c0-1.7 1.3-3 3-3s3 1.3 3 3"/>
				   <line x1="14" y1="10" x2="19" y2="10" />
				   <line x1="14" y1="14" x2="18" y2="14" />
				   
				 </>
				 ),
				},
				{
                 title: 'Defense Driving',
				 text: 'Learn to stay safe on the road, always.',
				 icon: (
				 <>
				   <circle cx="9" cy="8" r="3"/>
				   <circle cx="17" cy="9" r="2.5"/>
				   <path d="M320v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/>
				   <path d="M17 14a4 4 0 0 1 4 4v2" />
				   
				 </>
				 ),
				},
				
				]
				
export default function Courses(){

     return(
     <section className="relative overflow-hidden bg-navy-950 text-white py-20">
	    <div 
		className="absolute inset-0 bg-cover bg-center opacity-30"
         style={{ backgroundImage: "url('/images/27725622555_status_c883cbfbab6040fa899d6e2aed8c26a8_1.jpg')"}}/>
		<div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/70 to-navy-950" />
		<div className="relative max-w-7xl mx-auto px-6">
		 <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 items-center">
	      <Reveal>
		      <p className="text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
			  Our Courses
			  </p>
			  <h2 className="text-3xl md:4xl font-extrabold leading-tight mb-4">
			  Driving Lessons for Every Stage
			  </h2>
			  <p className="text-gray-300 text-sm leading-relaxed mb-6">
			  Whether you are a beginner or need a refresher, we have a course that fits your need.
			  </p>
			  
			  <Link href="/pricing"
			  className="inline-block bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full text-sm font-semiblod transition-colors">
			      View Pricing →
			  </Link>
		  </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
		 {courses.map((c,i) =>(
		    <Reveal key={c.title} delay={i*100}>
			 <Link href="/courses"
			 className="group flex h-full flex-col items-center text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:-transition-y-1 hover:border-brand-400/60 hover:bg-brand-white/10">
			 <div className="mb-4 text-brand-400">
			  <svg 
			  width="40"
			  height="40"
			  viewBox="0 0 24 24"
			  fill="none"
			  stroke="currentColor"
			  strokeWidth="1.5">
			  {c.icon}
			  </svg>
			  
			 </div>
			 <h3 className="font-semibold text-sm mb-2">{c.title}</h3>
			 <p className="text-gray-300 text-xs leading-relaxed mb-5">{c.icon}</p>
			 <span className="mt-auto flex h-9 w-9 items-center justify-center rounded-full border border-brand-400 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
			 →
			 </span>
			 </Link>
			</Reveal>
		 ))}
		</div>		  
	</div>
  </div>
</section>
)					
}
				