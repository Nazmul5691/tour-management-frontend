import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

export default function DiscoverTours() {
    const { data: tours = [], isLoading } = useGetAllToursQuery(undefined);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-lg text-muted-foreground">
                Loading tours...
            </div>
        );
    }

    // Helper function to calculate duration in days
    const calculateDays = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1); // At least 1 day
    };

    return (
        <section className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Explore Our Destinations
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold mt-2 leading-tight">
                    Explore{" "}
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Amazing Tours
                    </span>
                </h1>
                <p className="text-gray-800 mt-4 max-w-2xl mx-auto">
                    Explore breathtaking destinations and create unforgettable memories with our
                    carefully curated tours around Bangladesh.
                </p>
            </div>

            {/* Tours Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.slice(0, 6).map((tour) => {
                    const days = calculateDays(tour.startDate, tour.endDate);
                    return (
                        <div
                            key={tour._id}
                            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={
                                        tour.images?.[0] ||
                                        "https://placehold.co/600x400?text=No+Image"
                                    }
                                    alt={tour.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                                    {tour.location}
                                </div>
                                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                                    From ৳{tour.costFrom?.toLocaleString()}
                                </div>
                            </div>

                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-white">{tour.title}</h2>
                                <p className="text-gray-400 text-sm line-clamp-2">{tour.description}</p>

                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} /> {tour.departureLocation}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />{" "}
                                        {new Date(tour.startDate).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Duration Row */}
                                <div className="flex items-center gap-1 text-gray-400 text-sm">
                                    <Clock size={16} /> {days} {days > 1 ? "Days" : "Day"}
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full text-white px-5 py-2 text-sm">
                                        Explore Tour
                                    </Button>
                                    <div className="flex items-center text-gray-400 text-xs gap-1">
                                        <Users size={14} /> Max {tour.maxGuest}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
                <Button
                    variant="secondary"
                    className="text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold px-6 py-2 rounded-full"
                >
                    Explore All Tours
                </Button>
            </div>
        </section>
    );
}
