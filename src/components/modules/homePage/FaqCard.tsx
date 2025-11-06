/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function FaqCard() {
    // add your array of object data
    const dataArr = [
        {
            title: 'How can I book a tour with you?',
            description:
                'Booking is simple! Just browse our available tours, choose your desired destination and date, and click on “Book Now.” You can also contact our support team for personalized booking assistance.',
        },
        {
            title: 'Is transportation included in the tour package?',
            description:
                'Most of our packages include comfortable transportation options such as air-conditioned buses or private cars. Specific details are mentioned on each tour’s page.',
        },
        {
            title: 'What should I bring on my trip?',
            description:
                'We recommend packing light and bringing essentials such as comfortable clothing, sunscreen, a hat, travel documents, and your camera to capture beautiful moments!',
        },
        {
            title: 'Can I cancel or reschedule my booking?',
            description:
                'Yes, you can! Cancellations or reschedules are allowed within our policy timeline. Please review the cancellation policy mentioned on the booking page or contact our team for details.',
        },
        {
            title: 'Do you provide travel insurance?',
            description:
                'Travel insurance is not included by default, but we highly recommend adding it for peace of mind. Our team can help you arrange one easily before your trip.',
        },
    ];



    // toggle state and function
    const [isOpen, setIsOpen] = useState(null);
    const handleToggle = (idx: any) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    };

    return (
        <div className="flex w-full justify-center">
            <div className=" max-w-[550px] cursor-pointer space-y-6">
                {/* mapping each accordion  */}
                {dataArr.map((data, idx) => (
                    <div key={idx} onClick={() => handleToggle(idx)} className="flex items-center">
                        {/* the index div  */}
                        <div className="flex size-16 px-3 select-none items-center justify-center rounded-md bg-zinc-700 text-2xl font-semibold text-white">
                            <span>0{idx + 1}</span>
                        </div>

                        <div className="relative h-[2px] w-10 bg-zinc-700">
                            <span className="absolute -left-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 border-zinc-700 bg-white"></span>
                            <span className="h-1 w-10 bg-zinc-700"></span>
                            <span
                                className={`absolute -right-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 ${isOpen === idx ? 'border-zinc-700 bg-white delay-100' : 'border-transparent'}`}
                            ></span>
                        </div>

                        {/* main accordion div  */}
                        <div className="text-center">
                            <div className="relative max-w-[450px] border-t-[12px] border-zinc-700 bg-sky-50 p-3 shadow-md">
                                <span className="absolute right-0 top-0 h-0 w-0 border-b-[40px] border-r-[40px] border-b-transparent border-r-zinc-700"></span>
                                <h1 className="select-none text-lg text-zinc-700">{data.title}</h1>
                            </div>
                            <div className={`grid overflow-hidden text-slate-600 transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="max-w-[450px] bg-zinc-700 p-6 text-sm text-white">{data.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}





// import { useState } from "react";

// export default function FaqCard() {
//     const dataArr = [
//         {
//             title: 'How can I book a tour with you?',
//             description:
//                 'Booking is simple! Just browse our available tours, choose your desired destination and date, and click on “Book Now.” You can also contact our support team for personalized booking assistance.',
//         },
//         {
//             title: 'Is transportation included in the tour package?',
//             description:
//                 'Most of our packages include comfortable transportation options such as air-conditioned buses or private cars. Specific details are mentioned on each tour’s page.',
//         },
//         {
//             title: 'What should I bring on my trip?',
//             description:
//                 'We recommend packing light and bringing essentials such as comfortable clothing, sunscreen, a hat, travel documents, and your camera to capture beautiful moments!',
//         },
//         {
//             title: 'Can I cancel or reschedule my booking?',
//             description:
//                 'Yes, you can! Cancellations or reschedules are allowed within our policy timeline. Please review the cancellation policy mentioned on the booking page or contact our team for details.',
//         },
//         {
//             title: 'Do you provide travel insurance?',
//             description:
//                 'Travel insurance is not included by default, but we highly recommend adding it for peace of mind. Our team can help you arrange one easily before your trip.',
//         },
//     ];

//     const [isOpen, setIsOpen] = useState<number | null>(null);
//     const handleToggle = (idx: number) => {
//         setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
//     };

//     return (
//         <div className="flex w-full justify-center">
//             <div className="max-w-[550px] cursor-pointer space-y-6">
//                 {dataArr.map((data, idx) => (
//                     <div key={idx} onClick={() => handleToggle(idx)} className="flex items-center">
//                         {/* index badge */}
//                         <div className="flex size-16 px-3 select-none items-center justify-center rounded-md bg-gradient-to-r from-amber-400 via-orange-600 to-pink-600 text-2xl font-semibold text-white shadow-md">
//                             <span>0{idx + 1}</span>
//                         </div>

//                         {/* connecting line */}
//                         <div className="relative h-[2px] w-10 bg-gradient-to-r from-amber-400 via-orange-600 to-pink-600">
//                             <span className="absolute -left-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 border-amber-400 bg-white"></span>
//                             <span className="h-1 w-10 bg-gradient-to-r from-amber-400 via-orange-600 to-pink-600"></span>
//                             <span
//                                 className={`absolute -right-2 -top-[5px] z-40 h-3 w-3 rounded-full border-2 transition-colors ${isOpen === idx ? 'border-amber-400 bg-white delay-100' : 'border-transparent'}`}
//                             ></span>
//                         </div>

//                         {/* accordion section */}
//                         <div className="text-center">
//                             <div className="relative max-w-[450px] border-t-[12px] border-amber-400 bg-white/70 backdrop-blur-lg p-3 shadow-md rounded-md">
//                                 <span className="absolute right-0 top-0 h-0 w-0 border-b-[40px] border-r-[40px] border-b-transparent border-r-amber-400"></span>
//                                 <h1 className="select-none text-lg bg-gradient-to-r from-amber-400 via-orange-600 to-pink-600 bg-clip-text text-transparent font-semibold">
//                                     {data.title}
//                                 </h1>
//                             </div>
//                             <div
//                                 className={`grid overflow-hidden text-slate-600 transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
//                             >
//                                 <div className="overflow-hidden">
//                                     <div className="max-w-[450px] bg-gradient-to-r from-amber-400 via-orange-600 to-pink-600 p-6 text-sm text-white rounded-b-md shadow-md">
//                                         {data.description}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
