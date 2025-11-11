export default function TourDetailsBanner() {
    return (
        <section
            className="relative flex items-center justify-center min-h-[250px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative pt-18 z-10 text-center container mx-auto px-6">
                <h1 className="text-3xl md:text-[40px] font-bold text-white drop-shadow-lg mb-4">
                    
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Tour Details
                    </span>
                </h1>
                

                <div className="mt-6">
                    <a
                        href="/destination"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-yellow-500 hover:to-rose-600 transition-all duration-300"
                    >
                        Book Your Tour Now
                    </a>
                </div>
            </div>
        </section>
    );
}
