import PageHero from '@/components/ui/PageHero'

const sections = [
  {
    title: '1. Bookings and Payment',
    text: 'Lessons are booked and paid for online. A booking is only secured once payment has been received. The date and time you choose is a preference, and we will confirm your first lesson with you after payment.',
  },
  {
    title: '2. Cancellations and Rescheduling',
    text: 'Please give us at least 24 hours notice if you need to cancel or move a lesson. Lessons cancelled with less notice, or missed without notice, may be counted as used. Refunds for unused lessons are considered case by case.',
  },
  {
    title: '3. Licence and Eligibility',
    text: 'You must hold a valid learner licence or driving licence where the law requires one, and bring it to every lesson. We may refuse to start a lesson if you cannot show it.',
  },
  {
    title: '4. Fitness to Drive',
    text: 'You must not attend a lesson under the influence of alcohol or drugs, or while unwell in a way that affects safe driving. The instructor may end a lesson immediately if safety is at risk, and no refund applies for that lesson.',
  },
  {
    title: '5. Punctuality',
    text: 'Please be ready at the agreed pickup point. If you arrive more than 15 minutes late, the lesson may be shortened or cancelled.',
  },
  {
    title: '6. Test Results',
    text: 'We prepare you as well as we can, but we cannot guarantee that you will pass a licence test. Test fees are paid to the testing authority and are not included in our packages unless we say so.',
  },
  {
    title: '7. Conduct',
    text: 'We expect respectful behaviour towards instructors and vehicles. We may stop providing lessons to anyone who is abusive or unsafe.',
  },
  {
    title: '8. Liability',
    text: 'Lessons take place in dual-control vehicles with qualified instructors. To the extent the law allows, we are not liable for loss or damage that results from a student ignoring an instructor’s instructions.',
  },
  {
    title: '9. Changes to These Terms',
    text: 'We may update these terms from time to time. The version on this page applies when you book.',
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms and Conditions"
        description="Please read these terms before booking a lesson with us."
      />

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="mb-2 text-lg font-extrabold text-navy-900">{s.title}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{s.text}</p>
            </div>
          ))}

          <p className="border-t border-gray-100 pt-6 text-xs text-gray-400">
            Last updated: October 2026. Questions? Use the contact page.
          </p>
        </div>
      </section>
    </>
  )
}
