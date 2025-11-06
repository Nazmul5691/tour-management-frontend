import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { CalendarCheck, Plane, Star } from "lucide-react";

export default function HeroSection() {
    const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
        undefined
    );

    const { data: divisionData } = useGetDivisionsQuery(undefined);

    const divisionOption = divisionData?.data?.map(
        (item: { _id: string; name: string }) => ({
            label: item.name,
            value: item._id,
        })
    );

    return (
        <section
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
                {/* Left Content */}
                <div className="text-white space-y-6">
                    <p className="text-sm uppercase tracking-wide text-yellow-400 font-semibold">
                        Explore Bangladesh with Us
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                        Reveal the{" "}
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                            Unseen Beauty
                        </span>{" "}
                        <br />
                        of{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Bangladesh
                        </span>
                    </h1>

                    <p className="max-w-md text-gray-200 text-lg leading-relaxed">
                        Explore over a thousand cultural sites, stunning landscapes, and the
                        rich heritage of Bangladesh — from the world’s largest sea beach in
                        Cox’s Bazar to the mystical Sundarbans forest.
                    </p>
                </div>

                {/* Right Content (Glassmorphism Card) */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6 text-white">
                    {/* Glow border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 blur-xl -z-10" />

                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Find Your Perfect Tour
                    </h2>

                    {/* Division Select */}
                    <Select onValueChange={(value) => setSelectedDivision(value)}>
                        <SelectTrigger className="w-full bg-white/20 border border-white/30 text-gray-900">
                            <SelectValue
                                placeholder={
                                    <span className="text-gray-900">Select Division</span>
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-white/90 text-gray-900">
                            <SelectGroup>
                                <SelectLabel>Divisions</SelectLabel>
                                {divisionOption?.map(
                                    (item: { value: string; label: string }) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    )
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Icons Row */}
                    <div className="flex justify-around text-white/90 pt-2">
                        <div className="flex flex-col items-center gap-2">
                            <Plane className="h-6 w-6 text-cyan-400" />
                            <span className="text-sm font-medium">Online Tours</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Star className="h-6 w-6 text-pink-400" />
                            <span className="text-sm font-medium">Top Rated</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <CalendarCheck className="h-6 w-6 text-yellow-400" />
                            <span className="text-sm font-medium">Booking Now</span>
                        </div>
                    </div>

                    {/* Search Button */}
                    {selectedDivision ? (
                        <Button asChild className="w-full mt-4 text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600">
                            <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                        </Button>
                    ) : (
                        <Button
                            disabled
                            className="w-full mt-4 bg-white/30 text-white border border-white/30"
                        >
                            Search
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}




// import { Button } from "@/components/ui/button";
// import { Link } from "react-router";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { useGetDivisionsQuery } from "@/redux/features/division/division.api";


// export default function HeroSection() {
//     const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
//         undefined
//     );

//     // const { data: divisionData, isLoading: divisionIsLoading } =useGetDivisionQuery(undefined);
//     const { data: divisionData } =useGetDivisionsQuery(undefined);

//     const divisionOption = divisionData?.data?.map(
//         (item: { _id: string; name: string }) => ({
//             label: item.name,
//             value: item._id,
//         })
//     );


//     return (
//         <section className="relative overflow-hidden py-32 min-h-screen">
//             <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
//                 <img
//                     alt="background"
//                     src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
//                     className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
//                 />
//             </div>
//             <div className="relative z-10 container mx-auto">
//                 <div className="mx-auto flex max-w-5xl flex-col items-center">
//                     <div className="flex flex-col items-center gap-6 text-center">
//                         <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
//                             <Logo />
//                         </div>
//                         <div>
//                             <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
//                                 Explore the beauty of{" "}
//                                 <span className="text-primary">Bangladesh</span>
//                             </h1>
//                             <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
//                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
//                                 doloremque mollitia fugiat omnis! Porro facilis quo animi
//                                 consequatur. Explicabo.
//                             </p>
//                         </div>
//                         <div className="mt-6 flex justify-center gap-3">
//                             <Select onValueChange={(value) => setSelectedDivision(value)}>
//                                 <SelectTrigger className="w-[300px]">
//                                     <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectGroup>
//                                         <SelectLabel>Divisions</SelectLabel>
//                                         {divisionOption?.map(
//                                             (item: { value: string; label: string }) => (
//                                                 <SelectItem key={item.value} value={item.value}>
//                                                     {item.label}
//                                                 </SelectItem>
//                                             )
//                                         )}
//                                     </SelectGroup>
//                                 </SelectContent>
//                             </Select>

//                             {selectedDivision ? (
//                                 <Button asChild>
//                                     <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
//                                 </Button>
//                             ) : (
//                                 <Button disabled>Search</Button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
