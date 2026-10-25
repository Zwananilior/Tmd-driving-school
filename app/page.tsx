import Hero from '@/components/home/Hero'
import WhyChoose from '@/components/home/WhyChoose'
import Courses from '@/components/home/Courses'
import Testimonials from '@/components/home/Testimonials'
import BookingCta from '@/components/home/BookingCta'




export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Courses />
	  <Testimonials />
	  <BookingCta />
	
    </>
  )
}