import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/ui/Reveal'

const values = [ 
                  {
                    title: 'Safety First',
				    text: 'Every lesson is built around safe, responsible habits that last a lifetime.',
				  },
				  {
                    title: 'Patient Teaching',
				    text: 'We go at your pace, so you learn without pressure or stress.',
				  },
				  {
                    title: 'Real-world Ready',
				    text: 'We prepare you for real roads and real traffic, not only for the test',
				  },
				  {
                    title: 'Fair Pricing',
				    text: 'Clear package with no hidden costs, so always know what you are paying.',
				  },
				]
				
export default function AboutPage(){
	return(
	<>
	 <PageHero 
	 eyebrow="About Us"
	 title="Safe Drivers. Brighter Futures."
	 description="Get to know the team behind TMD Driving School."/>
	 <section className="bg-white-py-16">
	  <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
	     <Reveal>
		  <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Our Story</h2>
		  <p className="text-gray-600 text-sm leading-relaxed mb-4">
		   TMD Driving School was started to help people learn to drive with confidence. We 
		   believe a good driver is made through patience, practice and the right guidance.
		  </p>
		  
		  <p className="text-gray-600 text-sm leading-relaxed">
		  Today our instructors help beginners, returning drivers and test candidates build the
           skills and freedom they need to get on the road.		  
		  </p>
		  
		 </Reveal>
	
         <Reveal delay={150}>
		   <div className="aspect-[4/3] rounded-3xl bg-navy-950 flex items-center justify-center text-gray-400 text-sm">
		      <img src="images/27725622555_status_c883cbfbab6040fa899d6e2aed8c26a8_1.jpg" alt="cars"/>
		    
		   </div>
		 </Reveal>
		</div>
	</section>
	
	 <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
	       <Reveal>
	         <h2 className="text-3xl font-extrabold text-navy-900 text-center mb-10">
			   What We Stand For
			 </h2>
		   </Reveal>
		   <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		     {values.map((v,i) =>(
			     <Reveal key={v.title} delay={i*90}>
				   <div className="h-full rounded border border-gray-100 bg-white p-6 shadow-sm">
				   <h3 className="font-semibold text-navy-900 mb-2">{v.title}</h3>
				   <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
				   </div>
				 </Reveal>
			 ))}
		   </div>
		   
	    </div> 
 	 </section>
	 
	 <section className="bg-white py-16 text-center">
	   <div className="max-w-2xl mx-auto px-6">
	     <h2 className="text-2xl font-extrabold text-navy-900 mb-3">Ready to start?</h2>
	      <p className="text-gray-600 text-sm mb-6">
		    Take a look at our packages and pick the one that suits you.
		  </p>
		  <Link 
		  href="/pricing"
		  className="inline-block rounded-full bg-brand-500 hover:bg-brand-500 hover:bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors">
		  View Pricing
		  </Link>
	   </div>
	 </section>
	</>
	)
}				