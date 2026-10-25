import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'

const features = [
{
                  title: 'Experienced Instructors',
				  text: 'Patient, friendly and fully qualified.',
				  icon: (
				  <>
				  <circle cx="12" cy="8" r="4" />
				  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
				  </>
				  ),
},
{
	title: 'Safe & Modern Vehicles',
	text: 'well-maintained, clean and easy to drive',
	icon: (
	<>
	<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
	<polyline points="9 12 11 14 15 10" />
	</>
	),
},
{
	title: 'Flexible Lessons',
	text: 'Book at a time that works for you.',
	icon: (
	<>
	<rect x="3" y="4" width="18" height="18" rx="2" />
	<line x1="16" y1="2" x2="16" y2="6" />
	<line x1="8" y1="2" x2="8" y2="6" />
	<line x1="3" y1="10" x2="21" y2="10" />
	
	</>
	),
},
{
	title: 'High Pass Rate',
	text: 'We prepare you for real-life driving.',
	icon: (
	<>
     <circle cx="12" cy="12" r="10" />
	 <polyline points="8 12 11 15 16 9" />
	
	</>
	),
},
{
	title: 'Local & Convient',
	text: 'Lessons in your area or nearby',
	icon: (
	<>
     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
	 <circle cx="12" cy="10" r="3" />
	 
	</>
	),
},
{
	title: 'Ongoing Support',
	text: "We're with you every step of the way",
	icon: (
	<>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
   <rect x="2" y="14" width="4" height="6" rx="1" />
   <rect x="18" y="14" width="4" height="6" rx="1" />
	</>
	),
},



]

const stats = [
{ end: 1200, suffix: '+', label: 'Students Trained'},
{ end: 95, suffix: '%', label: 'Pass Rate'},
{ end: 8, suffix: '+', label: 'Years Experienced'},
{ end: 5, suffix: '', label: 'Qualified Instructors'},
]

export default function WhyChoose(){
	return(
	<section className="bg-white py-20">
	  <div className="max-w-7xl mx-auto px-6">
	     <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
		 
		 <Reveal>
		  <p className="text-brand-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
		  Why choose TMD
		  </p>
		  <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 leading-text mb-4">
		  More Than Just Driving Lessons
		  </h2>
		  
		  <p className="text-gray-600 text-sm leading-relaxed mb-6">
		  At TMD Driving School, we focus on building safe, responsible and confidenct drivers.
		  Our experienced instructors are patient, friendly and committed to your success.
		  </p>
		  <Link href="/about"
		  className="inline-block bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
		    About Us
		  </Link>
		  </Reveal>
		  
		  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
		    {features.map((f,i) =>(
			  <Reveal key={f.title} delay={i*90}>
			    <div className="group h-full rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:-translation-1 hover:shadow-lg hover:border-brand-400/40">
				 <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
				  <svg 
				    width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8">
					{f.icon}
					</svg>
				 </div>
				 <h3 className="font-semibold text-navy-900 text-sm mb-1">
				 {f.title}
				 </h3>
				 <p className="text-gray-500 text-xs leading-relaxed">
				 {f.text}
				 </p>
				</div>
			  </Reveal>
			))}
		  </div>
		 </div>
		 
		 <Reveal className="mt-16">
		       <div className="rounded-3xl bg-navy-950 px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			{stats.map((s) =>(
			  <div key={s.label}>
			   <p className="text-4xl md:text-5xl font-extrabold text-brand-400">
			    <CountUp end={s.end} suffix={s.suffix} />
			   </p>
			   <p className="text-gray-300 text-xs uppercase tracking-widest mt-2">{s.label}
			   </p>
			  </div>
			))}
			</div>
		 </Reveal>
	  </div>
	</section>
	)
}