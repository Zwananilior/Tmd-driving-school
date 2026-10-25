import [ supabase } from '@/lib/supabase'
import PageHero from '@/components/ui/PageHero'
import BookingForm from '@/components/booking/BookingForm'

export const revalidate = 0

export default async function BookingPage({
    searchParams,
}: {
     searchParams: Promise<{ package?: string }>
}){
    const params = await searchParams
	const initialsPackageId = params.package ?? ''
	
	const { data } = await supabase
	.from('packages')
	.select('id, name, description, lesson_count, price')
	.order('sort_order',{ ascending: true })
	
	const packages = data ?? []
	
	 return(
	  <>
	     <PageHero 
		 eyebrow="Book a lesson"
		 title="Start Your Driving Journey"
		 description="Choose a package, pick your preferred start time and pay securely online."/>
	      
		  <section className="max-w-2xl mx-auto px-6 py-16">
		     <BookingForm package={packages} initialsPackageId={initialsPackageId} />
		  </section>
	  </>
     )
}