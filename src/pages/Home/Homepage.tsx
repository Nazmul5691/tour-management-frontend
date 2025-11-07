
import ClientReview from "@/components/modules/homePage/ClientReview";
import DiscoverTours from "@/components/modules/homePage/DiscoverTours";
// import ExploreDreamTour from "@/components/modules/homePage/ExploreDreamTour";
import HeroSection from "@/components/modules/homePage/HeroSection";
import Milestone from "@/components/modules/homePage/Milestone";
import Parallax from "@/components/modules/homePage/Parallax";
import WhyBookWithUs from "@/components/modules/homePage/WhyBookWithUs";
import Faq from "@/components/modules/homePage/Faq";
import Blogs from "@/components/modules/homePage/Blogs";
import StartAdventure from "@/components/modules/homePage/StartAdventure";
import Carosouel from "@/components/modules/homePage/Carosouel";



export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <div className="bg-gray-100">
        <DiscoverTours />
      </div>
      <Carosouel />
      <WhyBookWithUs />
      <Milestone />
      <Parallax />
      <ClientReview />
      <Faq />
      <Blogs />
      <StartAdventure />
    </div>
  );
}
