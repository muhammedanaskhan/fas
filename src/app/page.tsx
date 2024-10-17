'use client'
import Topbar from "@/components/shared/Topbar";
import Image from "next/image";
import matrix from "@/assets/Matrix-bg.svg";
import TopCoins from "@/components/shared/TopCoinsContainer";
import { useState } from "react";
import CategorySelectors from "@/components/sections/CategorySelectors";
import PhaseSelectors from "@/components/sections/PhaseSelectors";
import BattleCards from "@/components/sections/BattleCards";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('all-duels');
  const [selectedPhase, setSelectedPhase] = useState('bootstrapping');

  console.log(selectedCategory, selectedPhase);

  return (
    <div className="relative h-lvh">
      <div className="fixed w-full h-[355px] z-0 bottom-0 overflow-hidden">
        <Image
          src={matrix}
          className=" object-cover w-full" // Removed fixed
          alt="hero"
        />
      </div>
      <div className="relative z-10 h-full">  {/* Ensure content is above the image */}
        <Topbar />
        <TopCoins />
        <CategorySelectors selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <PhaseSelectors selectedPhase={selectedPhase} setSelectedPhase={setSelectedPhase} />
        <BattleCards category={selectedCategory} phase={selectedPhase} />
      </div>
      {/*   <Timer /> */}
    </div>
  );
}
