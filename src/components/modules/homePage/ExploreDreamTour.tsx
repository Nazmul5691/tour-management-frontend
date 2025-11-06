import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Globe2, Plane, Briefcase } from "lucide-react";

export default function ExploreDreamTour() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Side - Image */}
        <div className="relative flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-green-100 p-2">
            <img
              src="https://res.cloudinary.com/dh3ej57qw/image/upload/v1762433747/cbd38b4e8942f8e58939dbac2eaedb72_voycaj.jpg" // 👈 replace with your image path
              alt="Happy Travelers"
              className="rounded-xl object-cover w-[400px] h-[400px]"
            />
          </div>

          {/* Floating Cards */}
          <div className="absolute top-5 right-10 bg-white shadow-md rounded-xl px-4 py-2 text-sm">
            <p className="font-semibold text-gray-800">All Listings</p>
          </div>

          <div className="absolute bottom-5 left-5 bg-white shadow-md rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            <span className="font-semibold text-gray-800">Today’s Earnings</span>
            <span className="text-red-500 font-bold">$2500</span>
            <Button size="sm" className="ml-2 bg-green-600 hover:bg-green-700 text-white">
              Withdraw
            </Button>
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div>
          <p className="text-sm text-orange-600 font-medium mb-2">About DreamTour</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
            Explore Beyond the Horizon: <br /> Discover the World’s Wonders
          </h2>
          <p className="text-gray-600 mb-6">
            We pride ourselves on offering personalized services for high-end clientele,
            with a commitment to crafting unique and unforgettable travel experiences.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-full">
                <Plane className="w-5 h-5" />
              </div>
              <p className="text-gray-700">
                Clients navigate their journeys, whether for travel or educational purposes,
                primarily in Canada, the U.S., and the U.K.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-full">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="text-gray-700">
                Provides a range of services from immigration advice to study-abroad
                support and vacation planning.
              </p>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full px-6">
              Learn More
            </Button>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
              <span className="font-semibold text-gray-900">5.0</span>
              <span className="text-gray-500 ml-1 text-sm">2K+ Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <Card className="bg-white shadow-sm border-none">
          <CardContent className="p-6">
            <Globe2 className="mx-auto text-green-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-900">Destinations Worldwide</h4>
            <p className="text-lg font-bold text-green-600 mt-1">50+</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardContent className="p-6">
            <Users className="mx-auto text-purple-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-900">Booking Completed</h4>
            <p className="text-lg font-bold text-purple-600 mt-1">7000+</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardContent className="p-6">
            <Users className="mx-auto text-pink-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-900">Client Globally</h4>
            <p className="text-lg font-bold text-pink-600 mt-1">100+</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-none">
          <CardContent className="p-6">
            <Users className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-900">Providers Registered</h4>
            <p className="text-lg font-bold text-blue-600 mt-1">89+</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
