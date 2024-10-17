'use client'
import Topbar from "@/components/shared/Topbar";
import Image from "next/image";
import matrix from "@/assets/Matrix-bg.svg";
import TopCoins from "@/components/shared/TopCoinsContainer";
import { useState } from "react";
import CategorySelectors from "@/components/sections/CategorySelectors";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('all-duels');
  const [selectedPhase, setSelectedPhase] = useState('live-duels');

  return (
    <div className="relative h-lvh">
      <Image src={matrix} className="fixed w-full h-[355px] object-cover bottom-[-25px] overflow-hidden" alt="hero" />
      <Topbar />
      <TopCoins />
      <CategorySelectors selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {/* <SubCategorySelectors selectedPhase={selectedPhase} setSelectedPhase={setSelectedPhase} />

      <DuelCards category={selectedCategory} phase={selectedPhase} />

      <Timer /> */}
    </div>
  );
}
