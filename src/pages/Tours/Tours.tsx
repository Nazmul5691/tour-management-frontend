/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { Link, useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar, Book } from "lucide-react";
import TourBanner from "@/components/modules/Tours/TourBanner";
import TourFilters from "@/components/modules/Tours/TourFilters";

export default function Tours() {
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  const [page, setPage] = useState(1);
  const limit = 6;
  const [activeImage, setActiveImage] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setPage(1);
  }, [division, tourType]);

  const { data: toursResponse, isFetching } = useGetAllToursQuery({
    division,
    tourType,
    page,
    limit,
  });

  const tours = toursResponse?.data || [];
  const meta = toursResponse?.meta;
  const totalPages = meta?.totalPage || 1;
  const totalTours = meta?.total || 0;

  const showPagination = totalTours > limit;

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

  return (
    <section>
      <TourBanner />

      <div className="container mx-auto px-5 pb-20 pt-">
        {/* Header */}
        <div className="text-center my-8">

          <h1 className="text-3xl md:text-[40px] font-bold text-white drop-shadow-lg mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Our Exclusive Tours
            </span>
          </h1>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filters */}
          <div className="col-span-12 md:col-span-3">
            <TourFilters />
          </div>

          {/* Tours */}
          <div className="col-span-12 md:col-span-9">
            {isFetching ? (
              <div className="text-center py-20 text-lg font-semibold">Loading...</div>
            ) : tours.length > 0 ? (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
                {tours.map((item: any) => {
                  const images = item.images?.length
                    ? item.images
                    : ["/images/default-tour.jpg"];
                  const currentImageIndex = activeImage[item._id] || 0;

                  return (
                    <div
                      key={item._id}
                      className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Image Slider */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={images[currentImageIndex]}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
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
                          {item.tourType?.name || "Tour"}

                        </div>

                        <Link to={`/tours/${item._id}`}>
                          <h3 className="text-lg font-bold text-gray-800 hover:text-orange-600 transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center text-gray-600 mt-1 text-sm">
                          <MapPin className="w-4 h-4 mr-1 " />
                          {item.departureLocation || item.location}
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex flex-row justify-between ">
                          <div>
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
                          {/* Button */}
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
            {/* {showPagination && (
              <div className="flex justify-center items-center mt-10 gap-2">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="bg-gray-200 hover:cursor-pointer text-gray-700 hover:bg-gray-300"
                >
                  &lt;
                </Button>

                {visiblePages.map((num) => (
                  <Button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`${page === num
                      ? "text-sm text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:cursor-pointer hover:to-rose-600 font-semibold"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {num}
                  </Button>
                ))}

                <Button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  &gt;
                </Button>
              </div>
            )} */}
            {/* Pagination */}
            {/* {showPagination && (
              <div className="flex justify-center items-center mt-10 gap-2">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={`bg-gray-200 text-gray-700 hover:bg-gray-300 ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  &lt;
                </Button>

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

                <Button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={`bg-gray-200 text-gray-700 hover:bg-gray-300 ${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  &gt;
                </Button>
              </div>
            )} */}
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
    </section>
  );
}











