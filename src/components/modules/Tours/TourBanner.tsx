export default function TourBanner() {
    return (
        <section
            className="relative flex items-center justify-center min-h-[400px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative pt-18 z-10 text-center container mx-auto px-6">
                <h1 className="text-3xl md:text-[40px] font-bold text-white drop-shadow-lg mb-4">
                    Explore Our {" "}
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Tours
                    </span>
                </h1>
                <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    Discover breathtaking destinations, exciting adventures, and unforgettable travel
                    experiences — all curated just for you by <span className="text-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Dream Tour</span>.
                </p>

                <div className="mt-6">
                    <a
                        href="/destination"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:from-yellow-500 hover:to-rose-600 transition-all duration-300"
                    >
                        Explore Destinations
                    </a>
                </div>
            </div>
        </section>
    );
}
