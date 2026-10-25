import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import Reveal from '@/components/ui/Reveal'

const courses = [ 
                 {
				     title: 'Beginner Lessons',
					 who: 'For people who have never driven before.',
					 points: [
					          'Vehicle controls and basic handling',
							  'Road signs and road rules',
							  'Starting, stopping and steering',
							  'Building confidence step by step',
							  ],
				 },
				  {
				     title: 'Refreher Courses',
					 who: 'For license holders who want to get back on the road.',
					 points: [
					          'Rebuilding your skills and confidence.',
							  'Busy roads and junctions.',
							  'Parking roads and reversing practice',
							  'Tailored to the areas you find hard',
							  ],
				 },
				  {
				     title: 'Test Preparation',
					 who: 'For learners getting ready for their license test.',
					 points: [
					          'Test router and manoeuvre practice',
							  'Mock test with the feedback',
							  'Common mistakes to avoid',
							  'Test-day tips and support',
							  ],
				 },
				  {
				     title: 'Defensive Driving',
					 who: 'For anyone who wants to be safer on the road.',
					 points: [
					          'hazard awareness and anticipation',
							  'Safe following distances',
							  'Handling night and wet-weather driving',
							  'Staying calm in difficult situations',
							  ],
				 },
			 ]

export default function CoursesPage(){
    return(
    <>    
	<PageHero
        eyebrow="Our Courses"
        title="Driving Lessons for Every Stage"
        description="Whether you are a beginner or need a refresher, we have a course that fits."
      />

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          {courses.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <div className="h-full flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h2 className="text-xl font-extrabold text-navy-900 mb-1">{c.title}</h2>
                <p className="text-brand-500 text-sm mb-5">{c.who}</p>

                <ul className="space-y-2 text-sm text-gray-600 mb-8">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand-500">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/pricing"
                  className="mt-auto inline-block self-start rounded-full bg-brand-500 hover:bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  See Pricing
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
   </>
	
    )
}			 