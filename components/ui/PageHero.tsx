export default function PageHero({
  eyebrow,
  title,
  description,
}:{
   eyebrow: string
   title: string
   description?: string
}){
    return(
    <section className="relative overflow-hidden bg-navy-950 text-white">
	   <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
	   <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
	   <p className="text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
	    {eyebrow}
	   </p>
	   <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
	   {description && <p className="text-gray-300">{description}</p>}
	   </div>
	</section> 
    )
}