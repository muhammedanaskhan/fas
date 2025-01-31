
'use client'
import React, { useEffect, useRef } from 'react'
import Marquee from 'react-fast-marquee';

export default function TopCoins() {

    const [cryptoData, setCryptoData] = React.useState([]);

    const marqueeContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchTopCoins();
    }, []);

    const fetchTopCoins = async () => {

        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
            );

            if (!res.ok) {
                throw new Error('not ok');
            }

            console.log("Response status:", res.status);
            console.log("Response headers:", res.headers);

            const data = await res.json();
            setCryptoData(data);
        } catch (error) {
            console.error("Error fetching top coins data:", error);
        }
    }

    useEffect(() => {
        const container = marqueeContainerRef.current;
        if (container) {
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;

            // Ensure we have enough content to scroll
            if (scrollWidth <= clientWidth) {
                container.style.animationDuration = '0s';  // Stop animation if not enough content
                return;
            }

            const animationDuration = scrollWidth / 0; // Adjust speed as needed
            container.style.animationDuration = `${animationDuration}s`;

            // Reset the transform to start from the beginning
            container.style.transform = 'translateX(0)';
        }
    }, [cryptoData]);


    return (
        <div className='my-6'>
            <div ref={marqueeContainerRef} className=''>
                <Marquee
                    className="h-[48px] flex "
                    pauseOnHover={true}
                    speed={100}
                    style={{
                        height: '48px !important',
                        overflowY: 'hidden',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                    {
                        cryptoData.map((coin: any) => (
                            <div key={coin.id} className="flex-shrink-0 mx-2 bg-[#1A1A1A] rounded-[24px] px-6 h-[40px] flex gap-4 items-center ">
                                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                                <span className="text-white">{coin.name}</span>
                                <span
                                    className={`${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                            </div>
                        ))
                    }
                </Marquee>
            </div>
        </div>
    )
}

