const AnnouncementBar = () => {
  const text = "100% Organic Farm Products | Free Shipping Above ₹999 | No Preservatives | Freshly Packed & Delivered"
  
  return (
    <div className="bg-forest h-10 overflow-hidden flex items-center">
      <div className="animate-scroll-left flex whitespace-nowrap pause-animation">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-white text-sm font-body mx-8 inline-flex items-center"
          >
            {text}
            <span className="mx-8 text-sage">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnnouncementBar
