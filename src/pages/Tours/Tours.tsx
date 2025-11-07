/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from "react";
import TourFilters from "@/components/modules/Tours/TourFilters";
import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { Link, useSearchParams } from "react-router";

export default function Tours() {
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // tours per page

  // FIX: Reset page to 1 whenever filters change
  useEffect(() => {
    // This ensures that when a new filter is applied, we go back to the first page
    setPage(1);
  }, [division, tourType]);

  // Fetch tours with pagination
  const { data: toursResponse, isFetching } = useGetAllToursQuery({
    division,
    tourType,
    page,
    limit,
  });

  // Extract data (assuming the backend fix ensures meta.total is correct)
  const tours = toursResponse?.data || [];
  const meta = toursResponse?.meta;
  const totalPages = meta?.totalPage || 1;
  const totalTours = meta?.total || 0;

  // CORRECT LOGIC: Show pagination only if the total filtered tours exceed the limit.
  const showPagination = totalTours > limit;

  // Calculate visible pages (max 5 pages at a time)
  const maxVisible = 5;
  let startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  startPage = Math.max(1, endPage - maxVisible + 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <section className="container mx-auto px-5 pb-16 pt-28">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Explore Our Tours
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose your dream destination — filter by division or tour type
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <TourFilters />
        </div>

        {/* Tour Cards */}
        <div className="col-span-12 md:col-span-9 space-y-8">
          {isFetching ? (
            <div className="text-center py-20">Loading...</div>
          ) : tours.length > 0 ? (
            tours.map((item: any) => (
              <div
                key={item._id}
                className="group border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 bg-white"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Tour Image */}
                  <div className="md:w-2/5 w-full h-56 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                      src={item.images?.[0] || "/images/default-tour.jpg"}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Tour Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <p>
                          <span className="font-medium">From:</span>{" "}
                          {item.departureLocation || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">To:</span>{" "}
                          {item.arrivalLocation || item.location || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Duration:</span>{" "}
                          {item.tourPlan?.length || 0} days
                        </p>
                        <p>
                          <span className="font-medium">Min Age:</span>{" "}
                          {item.minAge}+
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.amenities?.slice(0, 3).map(
                          (amenity: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                            >
                              {amenity}
                            </span>
                          )
                        )}
                        {item.amenities?.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{item.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg md:text-xl font-semibold text-primary">
                        From ৳{item.costFrom?.toLocaleString() || "N/A"}
                      </span>

                      <Button
                        asChild
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Link to={`/tours/${item._id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold text-gray-600">
                No tours found
              </h2>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters to find the perfect trip.
              </p>
            </div>
          )}

          {/* Numbered Pagination */}
          {showPagination && (
            <div className="flex justify-center items-center mt-8 gap-2">
              {/* Previous button */}
              <Button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                &lt;
              </Button>

              {/* Visible page numbers */}
              {visiblePages.map((num) => (
                <Button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`${
                    page === num
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </Button>
              ))}

              {/* Next button */}
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
          )}
        </div>
      </div>
    </section>
  );
}