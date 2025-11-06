import { useState,  type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { JSX } from 'react/jsx-runtime';

// --- 1. INTERFACE DEFINITION ---
/**
 * Defines the structure for a single card in the carousel.
 */
interface Card {
  id: number;
  title: string;
  price: string;
  imgUrl: string;
  details: string;
  rating: number;
}

// --- 2. SAMPLE DATA ---
const cards: Card[] = [
  { id: 1, title: 'Ha Long Bay', price: '$1,399', imgUrl: 'https://via.placeholder.com/300x200/52489C/FFFFFF?text=Ha+Long+Bay', details: 'A modern blend of tradition and high-tech.', rating: 4.8 },
  { id: 2, title: 'New York', price: '$1,299', imgUrl: 'https://via.placeholder.com/300x200/5E548E/FFFFFF?text=New+York', details: 'The city that never sleeps.', rating: 4.5 },
  { id: 3, title: 'Paris', price: '$1,199', imgUrl: 'https://via.placeholder.com/300x200/A06CD5/FFFFFF?text=Paris', details: 'The city of love and lights.', rating: 4.9 },
  { id: 4, title: 'Kyoto', price: '$1,250', imgUrl: 'https://via.placeholder.com/300x200/B5838D/FFFFFF?text=Kyoto', details: 'Temples and bamboo forests.', rating: 4.6 },
  { id: 5, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
  { id: 6, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
  { id: 7, title: 'Patagonia', price: '$1,500', imgUrl: 'https://via.placeholder.com/300x200/4B3F72/FFFFFF?text=Patagonia', details: 'Rugged mountains and glaciers.', rating: 4.7 },
];

// --- 3. CONFIGURATION ---
const CARD_WIDTH = 300; 
const OFFSET = 60; 

// --- 4. REACT COMPONENT ---
export default function Carosouel(): JSX.Element { // Using JSX.Element for the return type
  const [currentIndex, setCurrentIndex] = useState<number>(0); 
  const totalCards: number = cards.length;

  const nextCard = (): void => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = (): void => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  /**
   * Calculates the inline style (transform, scale, opacity, z-index) for each card
   * based on its distance from the currentIndex.
   */
  const getCardStyle = (index: number): CSSProperties => {
    const distance: number = index - currentIndex;
    const sign: number = Math.sign(distance);
    
    // Center Card (distance = 0)
    if (distance === 0) {
      return {
        transform: `translateX(0px) scale(1.15)`,
        zIndex: 10,
        opacity: 1,
      };
    }

    // Neighboring Cards (distance = 1, -1)
    if (Math.abs(distance) === 1) {
        return {
            transform: `translateX(${sign * (CARD_WIDTH / 2 + OFFSET)}px) scale(0.95)`,
            zIndex: 5,
            opacity: 0.8,
        };
    }
    
    // Further Cards (distance = 2, -2)
    if (Math.abs(distance) === 2) {
        return {
            transform: `translateX(${sign * (CARD_WIDTH + OFFSET * 2)}px) scale(0.85)`,
            zIndex: 1,
            opacity: 0.4,
        };
    }

    // Hide cards that are too far away
    return { zIndex: 0, opacity: 0, transform: 'scale(0.8)' };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
      <div className="relative w-[800px] h-[500px] flex items-center justify-center">
        
        {/* --- CARDS CONTAINER (The core of the effect) --- */}
        <div className="absolute w-full h-full flex justify-center items-center">
          {cards.map((card: Card, index: number) => (
            <div
              key={card.id}
              className={`absolute w-72 bg-white rounded-xl shadow-2xl p-4 transition-all duration-500 ease-in-out cursor-pointer`}
              style={getCardStyle(index)}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Card Image */}
              <img 
                src={card.imgUrl} 
                alt={card.title} 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              
              {/* Card Content (Opacity toggles visibility) */}
              <div className={`transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-xl font-bold text-gray-800 mb-1">{card.title}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Star size={14} className="text-yellow-500 mr-1 fill-yellow-500" />
                    <span>{card.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 h-10">{card.details}</p>
                <button className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-90 transition-opacity">
                  View Package
                </button>
              </div>
              
              {/* Price Tag */}
              <span className={`absolute top-0 right-0 p-2 text-white text-sm font-bold rounded-tr-xl rounded-bl-lg bg-yellow-600`}>
                {card.price}
              </span>
            </div>
          ))}
        </div>
        
        {/* --- Navigation Arrows --- */}
        <button 
          onClick={prevCard} 
          className="absolute left-0 z-20 p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-colors -translate-x-full"
          aria-label="Previous card"
        >
          <ChevronLeft size={30} />
        </button>
        <button 
          onClick={nextCard} 
          className="absolute right-0 z-20 p-2 text-white bg-black/30 rounded-full hover:bg-black/50 transition-colors translate-x-full"
          aria-label="Next card"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* --- Dots/Indicators --- */}
      <div className="flex justify-center mt-12">
        {cards.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full cursor-pointer transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}