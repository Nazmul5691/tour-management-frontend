import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Users, ShieldCheck, Headphones } from "lucide-react";

export default function WhyBookWithUs() {
    const features = [
        {
            icon: <BadgeCheck className="w-10 h-10 text-yellow-400" />,
            title: "Best Price Guarantee",
            description:
                "Find the best deals on tours across Bangladesh with our price match guarantee.",
        },
        {
            icon: <Users className="w-10 h-10 text-yellow-400" />,
            title: "Expert Local Guides",
            description:
                "Experience authentic Bangladesh with our knowledgeable and friendly local guides.",
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-yellow-400" />,
            title: "Safe & Secure Booking",
            description:
                "Book with confidence using our secure payment system and verified tour operators.",
        },
        {
            icon: <Headphones className="w-10 h-10 text-yellow-400" />,
            title: "24/7 Customer Support",
            description:
                "Our dedicated support team is always ready to help you plan your perfect trip.",
        },
    ];

    return (
        <section className="relative py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-center text-white">
            {/* Background blur overlay for glass effect */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center opacity-10"></div>

            <div className="relative max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        Why Choose Us
                    </span>
                    <h1 className="text-3xl md:text-[40px] font-extrabold mt-2 leading-tight">
                        Why{" "}
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Book With Us?
                        </span>
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Discover why travelers love us — trusted service, unbeatable deals,
                        <br />
                        and unforgettable experiences across Bangladesh.
                    </p>
                </div>

                {/* Glass Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <CardContent className="flex flex-col items-center space-y-3 py-4 px-6">
                                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-lg text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-sm">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
