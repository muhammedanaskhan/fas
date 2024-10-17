import Topbar from "@/components/shared/Topbar";
import Image from "next/image";
import matrix from "@/assets/Matrix-bg.svg";
import TopCoins from "@/components/shared/TopCoinsContainer";

export default function Home() {
  return (
    <div className="relative h-lvh">
      <Image src={matrix} className="fixed w-full h-[355px] object-cover bottom-[-25px] overflow-hidden" alt="hero" />
      <Topbar />
      <TopCoins />
    </div>
  );
}
