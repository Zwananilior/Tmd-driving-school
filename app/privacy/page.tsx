import PageHero from '@/components/ui/PageHero'

const sections = [
  {
    title: '1. Information We Collect',
    text: 'When you create an account or book a lesson we collect your name, email address, phone number, and any notes you give us. If you sign in with Google, we receive your name and email from Google. We do not receive your Google password.',
  },
  {
    title: '2. How We Use It',
    text: 'We use your information to manage your account, arrange and confirm lessons, process payments, and reply to messages you send us.',
  },
  {
    title: '3. Payments',
    text: 'Card payments are handled by Stripe. We never see or store your card number. We keep a record of the amount paid and the payment reference.',
  },
  {
    title: '4. Who We Share It With',
    text: 'We use trusted providers to run the site: Supabase for our database and login, and Stripe for payments. They process data on our behalf. We do not sell your personal information.',
  },
  {
    title: '5. Keeping Your Data Safe',
    text: 'We take reasonable steps to protect your information, including secure connections and restricted access to our records.',
  },
  {
    title: '6. Your Rights',
    text: 'You may ask to see the personal information we hold about you, to correct it, or to have it deleted, subject to any records we must keep by law. Contact us to make a request.',
  },
  {
    title: '7. Cookies',
    text: 'We use only the cookies and browser storage needed to keep you logged in.',
  },
  {
    title: '8. Changes to This Policy',
    text: 'We may update this policy from time to time. The latest version is always on this page.',
  },
]


export default function PrivacyPage(){
    return(
      <>
	      <PageHero 
		  eyebrow="Legal"
		  title="Privacy Policy"
		  description="How we collect, use and protect your person information"
		  />
		  
		  <section className="bg-white py-16">
		     <div className="max-w-3xl mx-auto px-6 space-y-8">
			    {sections.map((s) =>(
				   <div 
				   key={s.title}>
				   <h2 className="mb-2 text-lg font-extrabold text-navy-900">{s.title}</h2>
				   <p className="text-sm leading-relaxed text-gray-600">{s.title}</p>
				   </div>
				))}
				<p className="border border-gray-100 pt-6 text-xs text-gray-400">
				 Last update: October 2026. To make a privacy request, use the contact page.
				</p>
			 </div>
		  </section>
	  </> 
    )
}