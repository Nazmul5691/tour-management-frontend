import { useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

// ✅ Card type definition
interface Card {
  id: number;
  title: string;
  price: string;
  imgUrl: string;
  details: string;
  rating: number;
}

// ✅ Sample Data
const cards: Card[] = [
  {
    id: 1,
    title: "Sundarban Adventure",
    price: "$899",
    imgUrl: "/images/tour1.jpg",
    details: "Explore the mangrove forests and wildlife with expert guides.",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Saint Martin Getaway",
    price: "$749",
    imgUrl: "/images/tour2.jpg",
    details: "Relax on pristine beaches and enjoy clear turquoise water.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Bandarban Discovery",
    price: "$999",
    imgUrl: "/images/tour3.jpg",
    details: "Experience hills, waterfalls, and tribal culture.",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Cox’s Bazar Beach Escape",
    price: "$699",
    imgUrl: "/images/tour4.jpg",
    details: "The world’s longest sea beach with stunning sunset views.",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Sylhet Tea Garden Tour",
    price: "$699",
    imgUrl: "/images/tour5.jpg",
    details: "Lush tea gardens and rolling hills perfect for nature lovers.",
    rating: 4.5,
  },
  {
    id: 6,
    title: "Tanguar Haor Exploration",
    price: "$699",
    imgUrl: "/images/tour6.jpg",
    details: "A stunning wetland area known for its biodiversity.",
    rating: 5.0,
  },
];

const CARD_WIDTH = 300;
const OFFSET = 60;

export default function Carousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cards.length;

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % totalCards);
  const prevCard = () =>
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);

  // 🌀 Card positioning style logic
  const getCardStyle = (index: number): CSSProperties => {
    const distance = index - currentIndex;
    const sign = Math.sign(distance);

    if (distance === 0)
      return { transform: `translateX(0px) scale(1.15)`, zIndex: 10, opacity: 1 };
    if (Math.abs(distance) === 1)
      return {
        transform: `translateX(${sign * (CARD_WIDTH / 2 + OFFSET)}px) scale(0.95)`,
        zIndex: 5,
        opacity: 0.85,
      };
    if (Math.abs(distance) === 2)
      return {
        transform: `translateX(${sign * (CARD_WIDTH + OFFSET * 2)}px) scale(0.85)`,
        zIndex: 1,
        opacity: 0.6,
      };
    return { zIndex: 0, opacity: 0, transform: "scale(0.8)" };
  };

  return (
    <section className="relative py-10 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      {/* --- Header --- */}
      <div className="text-center mb-8">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Popular Tours
        </span>
        <h2 className="text-3xl md:text-[40px] font-extrabold mt-2 leading-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Top Packages
          </span>
        </h2>
        <p className="text-gray-800 mt-4 max-w-xl mx-auto">
          Handpicked travel experiences across Bangladesh — crafted to 
          <br />
          make your journey unforgettable.
        </p>
      </div>

      {/* --- Carousel --- */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[900px] h-[500px] flex items-center justify-center">
          <div className="absolute w-full h-full flex justify-center items-center">
            {cards.map((card, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={card.id}
                  className={`absolute w-72 bg-white backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-5 transition-all duration-500 ease-in-out cursor-pointer ${isActive ? "scale-105 shadow-3xl" : "opacity-90"
                    }`}
                  style={getCardStyle(index)}
                  onClick={() => setCurrentIndex(index)}
                >
                  {/* --- Image --- */}
                  <img
                    src={card.imgUrl}
                    alt={card.title}
                    className={`w-full h-48 object-cover rounded-xl mb-4 ${isActive ? "opacity-100" : "opacity-90"
                      }`}
                  />

                  {/* --- Content (always visible) --- */}
                  <div
                    className={`transition-all duration-500 ${isActive ? "text-gray-800" : "text-gray-500"
                      }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-1 ${isActive
                          ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
                          : "text-gray-700"
                        }`}
                    >
                      {card.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Star
                        size={14}
                        className="text-yellow-500 mr-1 fill-yellow-500"
                      />
                      <span>{card.rating.toFixed(1)}</span>
                    </div>

                    <p className="text-sm mb-4 h-10">{card.details}</p>

                    <button
                      className={`w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 hover:cursor-pointer to-pink-500 hover:opacity-90 transition-all shadow-md ${!isActive ? "opacity-70" : "opacity-100"
                        }`}
                    >
                      View Package
                    </button>
                  </div>

                  {/* --- Price Tag --- */}
                  <span className="absolute top-0 right-0 px-3 py-2 text-white text-sm font-semibold rounded-tr-2xl rounded-bl-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                    {card.price}
                  </span>
                </div>
              );
            })}
          </div>

          {/* --- Navigation Arrows --- */}
          <button
            onClick={prevCard}
            className="absolute left-0 z-20 p-3 text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full hover:cursor-pointer hover:opacity-80 transition-all -translate-x-full"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-0 z-20 p-3 text-white bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 rounded-full hover:cursor-pointer hover:opacity-80 transition-all translate-x-full"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* --- Dots --- */}
        <div className="flex justify-center mt-10">
          {cards.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex
                  ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 scale-110"
                  : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}













// import { useState, type CSSProperties } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
// import type { JSX } from 'react/jsx-runtime';

// // --- 1. INTERFACE DEFINITION ---
// /**
//  * Defines the structure for a single card in the carousel.
//  */
// interface Card {
//   id: number;
//   title: string;
//   price: string;
//   imgUrl: string;
//   details: string;
//   rating: number;
// }

// // --- 2. SAMPLE DATA ---
// const cards: Card[] = [
//   { id: 1, title: 'Ha Long Bay', price: '$1,399', imgUrl: 'https://via.placeholder.com/300x200/52489C/FFFFFF?text=Ha+Long+Bay', details: 'A modern blend of tradition and high-tech.', rating: 4.8 },
//   { id: 2, title: 'New York', price: '$1,299', imgUrl: 'https://via.placeholder.com/300x200/5E548E/FFFFFF?text=New+York', details: 'The city that never sleeps.', rating: 4.5 },
//   { id: 3, title: 'Paris', price: '$1,199', imgUrl: 'https://via.placeholder.com/300x200/A06CD5/FFFFFF?text=Paris', details: 'The city of love and lights.', rating: 4.9 },
//   { id: 4, title: 'Kyoto', price: '$1,250', imgUrl: 'https://via.placeholder.com/300x200/B5838D/FFFFFF?text=Kyoto', details: 'Temples and bamboo forests.', rating: 4.6 },
//   { id: 5, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
//   { id: 6, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
//   { id: 7, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
// ];

// // --- 3. CONFIGURATION ---
// const CARD_WIDTH = 300;
// const OFFSET = 60;

// // --- 4. REACT COMPONENT ---
// export default function Carosouel(): JSX.Element { // Using JSX.Element for the return type
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const totalCards: number = cards.length;

//   const nextCard = (): void => {
//     setCurrentIndex((prev) => (prev + 1) % totalCards);
//   };

//   const prevCard = (): void => {
//     setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
//   };

//   /**
//    * Calculates the inline style (transform, scale, opacity, z-index) for each card
//    * based on its distance from the currentIndex.
//    */
//   const getCardStyle = (index: number): CSSProperties => {
//     const distance: number = index - currentIndex;
//     const sign: number = Math.sign(distance);

//     // Center Card (distance = 0)
//     if (distance === 0) {
//       return {
//         transform: `translateX(0px) scale(1.15)`,
//         zIndex: 10,
//         opacity: 1,
//       };
//     }

//     // Neighboring Cards (distance = 1, -1)
//     if (Math.abs(distance) === 1) {
//       return {
//         transform: `translateX(${sign * (CARD_WIDTH / 2 + OFFSET)}px) scale(0.95)`,
//         zIndex: 5,
//         opacity: 0.8,
//       };
//     }

//     // Further Cards (distance = 2, -2)
//     if (Math.abs(distance) === 2) {
//       return {
//         transform: `translateX(${sign * (CARD_WIDTH + OFFSET * 2)}px) scale(0.85)`,
//         zIndex: 1,
//         opacity: 0.4,
//       };
//     }

//     // Hide cards that are too far away
//     return { zIndex: 0, opacity: 0, transform: 'scale(0.8)' };
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
//       <div className="relative w-[800px] h-[500px] flex items-center justify-center">

//         {/* --- CARDS CONTAINER (The core of the effect) --- */}
//         <div className="absolute w-full h-full flex justify-center items-center">
//           {cards.map((card: Card, index: number) => (
//             <div
//               key={card.id}
//               className={`absolute w-72 bg-white rounded-xl shadow-2xl p-4 transition-all duration-500 ease-in-out cursor-pointer`}
//               style={getCardStyle(index)}
//               onClick={() => setCurrentIndex(index)}
//             >
//               {/* Card Image */}
//               <img
//                 src={card.imgUrl}
//                 alt={card.title}
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />

//               {/* Card Content (Opacity toggles visibility) */}
//               <div className={`transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
//                 <p className="text-xl font-bold text-gray-800 mb-1">{card.title}</p>
//                 <div className="flex items-center text-sm text-gray-500 mb-2">
//                   <Star size={14} className="text-yellow-500 mr-1 fill-yellow-500" />
//                   <span>{card.rating.toFixed(1)}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4 h-10">{card.details}</p>
//                 <button className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90 transition-opacity">
//                   View Package
//                 </button>
//               </div>

//               {/* Price Tag */}
//               <span className={`absolute top-0 right-0 p-2 text-white text-sm font-bold rounded-tr-xl rounded-bl-lg bg-yellow-600`}>
//                 {card.price}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* --- Navigation Arrows --- */}
//         <button
//           onClick={prevCard}
//           className="absolute left-0 z-20 p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-colors -translate-x-full"
//           aria-label="Previous card"
//         >
//           <ChevronLeft size={30} />
//         </button>
//         <button
//           onClick={nextCard}
//           className="absolute right-0 z-20 p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-colors translate-x-full"
//           aria-label="Next card"
//         >
//           <ChevronRight size={30} />
//         </button>
//       </div>

//       {/* --- Dots/Indicators --- */}
//       <div className="flex justify-center mt-12">
//         {cards.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${index === currentIndex ? 'bg-white' : 'bg-white/40'
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }