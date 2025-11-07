import FaqCard from "./FaqCard";

export default function Faq() {
    return (
        <section className="relative bg-gradient-to-b from-sky-50 to-white py-10 lg:pb-0 lg:pt-15 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">

                {/* FAQ Section Heading */}
                <div className="text-center mb-10 space-y-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Need Help? We've Got You Covered
                    </p>
                    <h2 className="text-3xl md:text-[40px] font-extrabold mt-2 leading-tight">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Frequently Asked Questions
                        </span>
                    </h2>
                    <p className="text-gray-800 mt-4 max-w-2xl mx-auto">
                        Browse our FAQ section to find answers to common questions about booking, <br />
                        transportation, travel essentials, cancellations, and more.
                    </p>
                </div>

                {/* Left side with Image and Text + FAQ */}
                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left side - Image with short intro */}
                    <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
                        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1762456393/iii_nb0io8.jpg"
                                alt="Travel FAQ"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm uppercase tracking-wide text-sky-200">
                                    Need Travel Help?
                                </p>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    Your Journey, <br /> Simplified & Secure.
                                </h2>
                            </div>
                        </div>

                        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-md">
                            Have questions before your next adventure? Explore our FAQ section to find
                            everything you need — from booking details to travel safety and more.
                        </p>
                    </div>

                    {/* Right side - FAQ accordion */}
                    <div className="w-full">
                        <FaqCard />
                    </div>
                </div>

                {/* Soft gradient decorations */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-sky-200 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-30"></div>
            </div>
        </section>
    );
}
