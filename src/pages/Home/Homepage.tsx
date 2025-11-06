import DiscoverTours from "@/components/modules/homePages/DiscoverTours";
import HeroSection from "@/components/modules/homePages/HeroSection";



export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <div className="bg-gray-100">
        <DiscoverTours />
      </div>
    </div>
  );
}
