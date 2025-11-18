/* eslint-disable react-hooks/exhaustive-deps */

import LocationMap from "@/components/modules/Tours/LocationMap";
import TourDetailsBanner from "@/components/modules/Tours/TourDetailsBanner";
import { Button } from "@/components/ui/button";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetAllToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Book, CheckSquare, MapPin, XSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(totalAmount);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetAllToursQuery({ _id: id });
  const [createBooking] = useCreateBookingMutation();

  const tourData = data?.data?.[0];

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  const { data: tourType } = useGetTourTypesQuery(
    {
      _id: data?.data?.[0]?.tourType
    },
    {
      skip: !data
    }
  )

  const incrementGuest = () => {
    setGuestCount((prv) => prv + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prv) => prv - 1);
  };

  const handleBooking = async () => {
    let bookingData;

    if (data) {
      bookingData = {
        tour: id,
        guestCount: guestCount,
      };
    }

    try {
      const res = await createBooking(bookingData).unwrap();
      console.log(res);
      if (res.success) {
        window.open(res.data.payment);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <TourDetailsBanner />
      </div>
      <div className="container mx-auto mt-10 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {!isLoading && isError && (
          <div>
            <p>Something Went Wrong!!</p>{" "}
          </div>
        )}

        {!isLoading && data?.data.length === 0 && (
          <div>
            <p>No Data Found</p>{" "}
          </div>
        )}

        {!isLoading && !isError && data!.data!.length > 0 && (
          <>
            {/* Left Section - Tour Summary */}

            <div className="lg:col-span-2">
              {/* Images */}
              <div className="mb-8">
                {tourData?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${tourData?.title} ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                ))}
              </div>


              {/* Header */}
              <div className="mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{tourData?.title}</h1>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <div className="flex gap-2">
                      <p className="flex items-center"><Book className="w-4 h-4 mr-1 " /> {tourType?.data?.[0]?.name}</p>
                      <p className="flex items-center"><MapPin className="w-4 h-4 mr-1 " /> {tourData?.location}</p>
                    </div>
                    {/* <span>💰 From ${tourData?.costFrom}</span> */}
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600 ">Starts From </span>
                      <span className="text-orange-600 font-bold text-lg">
                        ৳{tourData?.costFrom?.toLocaleString()}
                      </span>
                    </div>
                    {/* <span>👥 Max {tourData?.maxGuest} guests</span> */}
                  </div>
                </div>
              </div>


              {/* description */}
              <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{tourData?.description}</p>
              </div>


              {/* tour plans */}
              <div className="bg-gray-100 p-5 rounded-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Tour Plans</h2>
                <div className="bg-white rounded-md p-5">
                  <ol className="space-y-2">
                    {tourData?.tourPlan?.map((plan, index) => (
                      <li key={index} className="flex">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {plan}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>



              {/* tour Amenities */}
              <div className="bg-gray-100 p-5 rounded-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Tour Amenities</h2>
                <div className="bg-white rounded-md p-5">
                  <ol className="space-y-2">
                    {tourData?.amenities?.map((amenity, index) => (
                      <li key={index} className="flex">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {amenity}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>


              {/* tour included & excluded */}
              <div className="bg-gray-100 p-5 rounded-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Tour Included & Excluded</h2>
                <div className="flex justify-between md:flex-row flex-col px-5">
                  <div>
                    <ol className="space-y-2">
                      {tourData?.included?.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4 text-green-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <ol className="space-y-2">
                      {tourData?.excluded?.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <XSquare className="h-4 w-4 text-red-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>


              {/* gallery */}
              <div className="bg-gray-100 p-5 rounded-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tourData?.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                  ))}
                </div>
              </div>


              {/* location map */}
              <div className="bg-gray-100 p-5 rounded-md mt-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="w-full h-64">
                  <LocationMap locationName={tourData?.location || "Bangladesh"} />
                </div>
              </div>




            </div>

            {/* Right Section - Booking Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border border-muted p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Guests
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={decrementGuest}
                        disabled={guestCount <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">
                        {guestCount}
                      </span>
                      <button
                        onClick={incrementGuest}
                        disabled={guestCount >= tourData!.maxGuest}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Price per person:</span>
                      <span>${tourData?.costFrom}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Guests:</span>
                      <span>{guestCount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>

                 
                  <Button
                    onClick={handleBooking}
                    className="text-sm w-full text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold"
                  >
                    Book Now
                  </Button>
                </div>
              </div>





              <div className="bg-gray-100 p-5 border shadow-md flex flex-col gap-4 rounded-md">
                <h2 className="text-xl font-semibold ">Tour Details</h2>
                <div className="border"></div>

                <div className="grid grid-cols-2 font-semibold justify-between">
                  <div>
                    <p>Date</p>{" "}
                  </div>
                  <div className="text-gray-600">
                    {format(
                      new Date(
                        tourData?.startDate ? tourData?.startDate : new Date()
                      ),
                      "PP"
                    )}{" "}
                    -{" "}
                    {format(
                      new Date(tourData?.endDate ? tourData?.endDate : new Date()),
                      "PP"
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2  font-semibold justify-between">
                  <div>
                    <p>Duration</p>
                  </div>
                  <div className="text-gray-600">
                    {tourData?.startDate && tourData?.endDate
                      ? (() => {
                        const start = new Date(tourData.startDate).getTime();
                        const end = new Date(tourData.endDate).getTime();
                        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                        const nights = days > 0 ? days - 1 : 0;
                        return `${days} days,${nights} nights`;
                      })()
                      : "N/A"}
                  </div>
                </div>

                <div className="grid grid-cols-2 font-semibold justify-between">
                  <div>
                    <p>Destination</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{tourData?.location}</p>
                  </div>
                </div>


                <div className="grid grid-cols-2  font-semibold justify-between">
                  <div>
                    <p>Departure</p>{" "}
                  </div>
                  <div className="text-gray-600">
                    {tourData?.startDate
                      ? new Date(tourData.startDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </div>
                </div>


                <div className="grid grid-cols-2  font-semibold justify-between">
                  <div>
                    <p>Return{" "}</p>
                  </div>
                  <div className="text-gray-600">
                    {tourData?.endDate
                      ? new Date(tourData.endDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </div>
                </div>

                <div className="grid grid-cols-2 font-semibold justify-between">
                  <div>
                    <p>Total Peoples</p>
                  </div>
                  <div className="text-gray-600">
                    <p >{tourData?.maxGuest}</p>
                  </div>
                </div>

              </div>




            </div>
          </>
        )}
      </div>
    </div>
  );
}






















// //  const tourData: ITourPackage = {
// //    _id: "1",
// //    title: "Magical Santorini Island Adventure",
// //    description:
// //      "Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.",
// //    location: "Santorini, Greece",
// //    images: [
// //      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
// //      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=300&fit=crop",
// //      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
// //    ],
// //    costFrom: 1299,
// //    maxGuest: 12,
// //    startDate: "2024-06-15",
// //    endDate: "2024-06-20",
// //    departureLocation: "Athens International Airport",
// //    arrivalLocation: "Santorini Airport",
// //    division: "Cyclades",
// //    tourType: "Cultural & Leisure",
// //    minAge: 18,
// //    amenities: [
// //      "Free WiFi",
// //      "Air Conditioning",
// //      "Swimming Pool Access",
// //      "24/7 Concierge",
// //      "Spa Services",
// //    ],
// //    included: [
// //      "Round-trip flights",
// //      "4-star hotel accommodation",
// //      "Daily breakfast",
// //      "Guided tours",
// //      "Wine tasting experience",
// //      "Sunset cruise",
// //    ],
// //    excluded: [
// //      "Travel insurance",
// //      "Lunch and dinner",
// //      "Personal expenses",
// //      "Optional activities",
// //      "Tips and gratuities",
// //    ],
// //    tourPlan: [
// //      "Arrival in Santorini and check-in to hotel",
// //      "Explore Fira town and enjoy welcome dinner",
// //      "Visit Oia village and watch famous sunset",
// //      "Wine tasting tour in traditional vineyards",
// //      "Relax at Red Beach and visit Akrotiri ruins",
// //      "Sunset sailing cruise and departure",
// //    ],
// //    slug: "magical-santorini-island-adventure",
// //    createdAt: "2024-01-15T10:30:00.000Z",
// //    updatedAt: "2024-02-10T14:45:00.000Z",
// //  };
