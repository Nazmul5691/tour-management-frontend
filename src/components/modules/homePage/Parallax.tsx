import { Button } from "@/components/ui/button";

export default function Parallax() {
    return (
        <section
            className="relative h-[100vh] bg-fixed bg-center bg-cover flex items-center justify-center text-center"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1762456393/iii_nb0io8.jpg')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 text-white px-6">
                <p className="text-sm md:text-base text-yellow-400 italic tracking-wider mb-3">
                    Make Memories That Last Forever.
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mx-auto">
                    Travel isn’t a luxury, <br /> it’s a way of life!
                </h1>
                <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-base md:text-lg">
                    Discover breathtaking destinations and authentic experiences — 
                    crafted just for you.
                </p>

                <Button className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 hover:cursor-pointer text-white font-semibold px-8 py-3 rounded-full">
                    Explore Tours
                </Button>
            </div>
        </section>
    );
}
