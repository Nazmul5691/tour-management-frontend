import TourDetailsBanner from "@/components/modules/Tours/TourDetailsBanner";
import { Button } from "@/components/ui/button";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetAllToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { format } from "date-fns";
import { Book, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";

export default function TourDetails() {
    const { id } = useParams();
    const { data, isLoading } = useGetAllToursQuery({ _id: id });

    const { data: divisionData } = useGetDivisionsQuery(
        {
            _id: data?.data?.[0]?.division,
            fields: "name",
        },
        {
            skip: !data
        }
    );

    const { data: tourType } = useGetTourTypesQuery(
        {
            _id: data?.data?.[0]?.tourType,
            fields: "name",
        },
        {
            skip: !data
        }
    );


    const tourData = data?.data?.[0];

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div>
                <TourDetailsBanner />
            </div>
            <div className="container mx-auto mt-10 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

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



                    {/* Tour Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
                            <div className="space-y-2">
                                <p>
                                    <strong>Dates:</strong>{" "}
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
                                </p>
                                <p>
                                    <strong>Departure:</strong> {tourData?.departureLocation}
                                </p>
                                <p>
                                    <strong>Arrival:</strong> {tourData?.arrivalLocation}
                                </p>
                                <p>
                                    <strong>Division:</strong> {divisionData?.data?.[0]?.name}
                                </p>
                                <p>
                                    <strong>Tour Type:</strong> {tourType?.data?.[0]?.name}
                                </p>
                                <p>
                                    <strong>Min Age:</strong> {tourData?.minAge} years
                                </p>
                            </div>
                        </div>


                    </div>

                    {/* Amenities & Inclusions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                            <ul className="space-y-1">
                                {tourData?.amenities?.map((amenity, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {amenity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Included</h3>
                            <ul className="space-y-1">
                                {tourData?.included?.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3">Excluded</h3>
                            <ul className="space-y-1">
                                {tourData?.excluded?.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="text-red-500 mr-2">✗</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tour Plan */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3">Tour Plan</h3>
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

                <div className="lg:col-span-1 space-y-6">
                    <div>
                        <Button asChild>
                            <Link to={`/booking/${tourData?._id}`}>Book Now</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}