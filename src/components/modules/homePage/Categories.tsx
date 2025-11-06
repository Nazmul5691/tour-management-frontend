/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  const { data, isLoading } = useGetTourTypesQuery(undefined);
  const categories = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-lg text-gray-400">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div>
          <span className="text-sm font-semibold text-rose-500 uppercase tracking-wider">
            • Featured Categories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900">
            Travelers &{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Preferences.
            </span>
          </h2>
        </div>

        <Button
          className="mt-6 md:mt-0 bg-gray-900 text-white rounded-full px-5 py-2 hover:bg-gray-800"
        >
          View All Categories <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 8).map((category: any) => (
          <div
            key={category._id}
            className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image placeholder (you’ll add real image later) */}
            <div className="h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-white text-xl font-semibold opacity-70">
                {category.name}
              </span>
            </div>

            {/* Overlay content */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
              <h3 className="text-lg font-bold text-white mb-1">
                {category.name}
              </h3>
              <p className="text-gray-300 text-sm">25 Tours</p>

              <div className="absolute right-5 bottom-5 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
