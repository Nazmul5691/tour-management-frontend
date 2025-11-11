


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Link, useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar, Book, ArrowDownWideNarrow } from "lucide-react";
import TourBanner from "@/components/modules/Tours/TourBanner";
import TourFilters from "@/components/modules/Tours/TourFilters";

// Define the available sort options and their corresponding query values
const sortOptions = [
  { label: "Recommended", value: "" }, // Default or backend-decided sort (e.g., relevance)
  { label: "Price: low to high", value: "costFrom" },
  { label: "Price: high to low", value: "-costFrom" },
  { label: "Newest", value: "-createdAt" },
];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  // Assuming 'searchTerm' might also be used in the URL
  const searchTerm = searchParams.get("searchTerm") || undefined;

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 6;

  // State for sorting, initialized to the recommended/default option
  const [sort, setSort] = useState<string>('');

  const [activeImage, setActiveImage] = useState<{ [key: string]: number }>({});

  // 1. Reset page on filter/sort change
  useEffect(() => {
    setPage(1);
  }, [division, tourType, sort, searchTerm]); // Reset page whenever filters or sort change

  // 2. Fetch tours with sort parameter
  const { data: toursResponse, isFetching } = useGetAllToursQuery({
    division,
    tourType,
    page,
    limit,
    searchTerm,
    // Pass the sort value. Use undefined if it's the default empty string.
    sort: sort || undefined,
  });

  const { data: tourTypesResponse } = useGetTourTypesQuery({});

  const tours = toursResponse?.data || [];
  const meta = toursResponse?.meta;
  const totalPages = meta?.totalPage || 1;
  const totalTours = meta?.total || 0;

  const tourTypes = tourTypesResponse?.data || [];

  const showPagination = totalTours > limit;

  // Pagination logic
  const maxVisible = 5;
  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  startPage = Math.max(1, endPage - maxVisible + 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff =
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    return `${diff} Day${diff > 1 ? "s" : ""}, ${diff - 1} Night${diff > 2 ? "s" : ""}`;
  };

  // NEW HELPER: Calculates the night count to use as a divisor for cost.


  // Handle image slider manually
  const handleNextImage = (id: string, total: number) => {
    setActiveImage((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (id: string, total: number) => {
    setActiveImage((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? total - 1 : (prev[id] || 0) - 1,
    }));
  };

  // Handler to reset sort state
  const handleResetSort = () => {
    setSort('');
  };

  // Logic for Tour Count Header Text
  const isFiltered = !!division || !!tourType || !!searchTerm;
  const countText = isFiltered
    ? `Showing ${totalTours} results matching your criteria`
    : `Showing ${totalTours} available tours`;

  return (
    <section>
      <TourBanner />

      <div className="container mx-auto px-5 pb-20 pt-8">
        {/* Page Title Header (Unchanged) */}
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-[40px] font-bold text-white drop-shadow-lg mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Our Exclusive Tours
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <TourFilters />

          </div>

          {/* Tours List and Controls */}
          <div className="col-span-12 md:col-span-9">

            {/* 3. New Tour Count and Sort Header - STYLED */}
            {!isFetching && (
              <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100">
                {/* Tour Count Display */}
                <div className="text-sm md:text-base font-semibold text-gray-700">
                  {countText}
                </div>

                {/* Sort By Dropdown and Reset */}
                <div className="flex items-center space-x-3">

                  <div className="flex items-center space-x-2">
                    <ArrowDownWideNarrow size={18} className="text-orange-500" />
                    <label htmlFor="tour-sort" className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">
                      Sort By:
                    </label>

                    <div className="relative">
                      {/* Beautiful Dropdown */}
                      <select
                        id="tour-sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="appearance-none block w-full py-2 pl-3 pr-8 text-sm border border-orange-300 rounded-lg bg-orange-50/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer transition shadow-inner"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {/* Custom Chevron Down Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <Button
                    onClick={handleResetSort}
                    disabled={sort === ''} // Disabled if already on 'Recommended'
                    className={`
                                text-xs py-1.5 h-auto px-3 rounded-lg font-semibold transition duration-200
                                ${sort === ''
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none'
                        : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
                      }
                            `}
                    aria-label="Reset Sort"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}

            {/* Tours Grid */}
            {isFetching ? (
              <div className="text-center py-20 text-lg font-semibold">Loading...</div>
            ) : tours.length > 0 ? (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                {tours.map((item: any) => {
                  const images = item.images?.length
                    ? item.images
                    : ["https://placehold.co/600x400/FF5722/FFFFFF?text=Tour+Image"];
                  const currentImageIndex = activeImage[item._id] || 0;

                  const matchedType = tourTypes.find((t: any) => t._id === item.tourType);
                  const tourTypeName = matchedType?.name || "Tour";

                  return (
                    <div
                      key={item._id}
                      className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Image Slider */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <Link to={`/tours/${item._id}`}>
                          <img
                            src={images[currentImageIndex]}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            // Fallback for placeholder image if necessary
                            onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/FF5722/FFFFFF?text=Tour+Image";
                            }}
                          />
                        </Link>
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => handlePrevImage(item._id, images.length)}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-1.5 rounded-full shadow"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={() => handleNextImage(item._id, images.length)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-1.5 rounded-full shadow"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="px-5 py-4">
                        <div className="mb-2 flex flex-row items-center">
                          <Book className="w-4 h-4 mr-1 text-orange-500" />
                          {tourTypeName}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>


                        <div className="flex items-center text-gray-600 mt-1 text-sm">
                          <MapPin className="w-4 h-4 mr-1 " />
                          {item.departureLocation || item.location}
                        </div>

                        {/* Price & Button (Updated Layout) */}
                        <div className="mt-2 flex flex-row justify-between items-end">
                          {/* Price Column */}
                          <div className="flex flex-col">
                            <div className="mb-1">
                              <span className="text-gray-600 text-sm">Starts From </span>
                              <span className="text-orange-600 font-bold text-lg">
                                ৳{item.costFrom?.toLocaleString()}
                              </span>
                              {item.oldPrice && (
                                <span className="line-through text-gray-400 ml-2">
                                  ৳{item.oldPrice}
                                </span>
                              )}
                            </div>


                          </div>

                          {/* Button Column */}
                          <div className="">
                            <Button
                              asChild
                              className="text-sm text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold"
                            >
                              <Link to={`/tours/${item._id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>

                        {/* Info Row */}
                        <div className="relative flex items-center text-gray-600 text-sm border-t mt-3 pt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            {getDuration(item.startDate, item.endDate)}
                          </div>

                          <div className="absolute left-1/2 transform -translate-x-1/2">
                            |
                          </div>

                          <div className="flex items-center gap-1 ml-auto">
                            <Users className="w-4 h-4 text-orange-500" />
                            {item.maxGuest || "N/A"} Guests
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-600 font-semibold">
                No tours found
              </div>
            )}

            {/* Pagination */}
            {showPagination && (
              <div className="flex justify-center items-center mt-10 gap-2">
                {/* Previous Button */}
                <div className="relative group">
                  <Button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`bg-gray-200 text-gray-700 hover:bg-gray-300 
          ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    &lt;
                  </Button>
                  {page === 1 && (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-lg">
                      ✖
                    </span>
                  )}
                </div>

                {/* Page Numbers */}
                {visiblePages.map((num) => (
                  <Button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`${page === num
                      ? "text-sm text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold cursor-pointer"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                      }`}
                  >
                    {num}
                  </Button>
                ))}

                {/* Next Button */}
                <div className="relative group">
                  <Button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`bg-gray-200 text-gray-700 hover:bg-gray-300 
          ${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    &gt;
                  </Button>
                  {page === totalPages && (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-lg">
                      ✖
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section >
  );
}
