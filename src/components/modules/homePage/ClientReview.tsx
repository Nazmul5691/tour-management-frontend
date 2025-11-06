import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClientReview() {
    const reviews = [
        {
            id: 1,
            name: "Rakib Hasan",
            role: "Traveler from Bangladesh",
            rating: 5,
            review:
                "Dream Tour’s service was amazing! The guides were friendly and professional. Every moment of the trip was enjoyable and memorable.",
            image: "/images/client1.jpg",
        },
        {
            id: 2,
            name: "Sumaiya Rahman",
            role: "Traveler from Chattogram",
            rating: 5,
            review:
                "I joined their Cox’s Bazar tour. Everything was perfectly managed — hotels, transportation, and itinerary. Highly recommended!",
            image: "/images/client2.jpg",
        },
        {
            id: 3,
            name: "Maya Akter",
            role: "Traveler from Sylhet",
            rating: 5,
            review:
                "It was my first international trip and Dream Tour made it so easy and enjoyable. Excellent planning and great support throughout.",
            image: "/images/client3.jpg",
        },
        {
            id: 4,
            name: "Firoz Khan",
            role: "Traveler from Cox's Bazar",
            rating: 5,
            review:
                "It was my first international trip and Dream Tour made it so easy and enjoyable. Excellent planning and great support throughout.",
            image: "/images/client4.jpg",
        },
    ];

    const [index, setIndex] = useState(0);

    // Auto slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [reviews.length]);

    return (
        <section className="bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 py-20 text-center text-white relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4">
                <p className="text-sm text-purple-300 mb-2 uppercase tracking-wide">
                    What Our Clients Say
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Our Pride — <span className="text-cyan-400">Client Testimonials</span>
                </h2>
                <p className="text-gray-300 mb-10">
                    Hear what our happy travelers have to say about their experiences with Dream Tour.
                </p>

                {/* Review Card Carousel */}
                <div className="relative h-[260px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={reviews[index].id}
                            initial={{ opacity: 0, scale: 0.8, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -40 }}
                            transition={{ duration: 0.6 }}
                            className="absolute left-0 right-0 mx-auto"
                        >
                            <Card className="bg-white/10 backdrop-blur-md text-left border-none shadow-xl rounded-2xl max-w-md mx-auto">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <img
                                            src={reviews[index].image}
                                            alt={reviews[index].name}
                                            className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">
                                                {reviews[index].name}
                                            </h4>
                                            <p className="text-sm text-gray-300">{reviews[index].role}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-yellow-400 mb-2">
                                        {Array.from({ length: reviews[index].rating }).map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400" />
                                        ))}
                                        <span className="ml-2 text-gray-200 font-medium">5.0</span>
                                    </div>

                                    <p className="text-gray-200 leading-relaxed">{reviews[index].review}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-cyan-400 w-6" : "bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}
