import React from 'react'
import TopCoinsMarquee from './TopCoinsMarquee';

export const revalidate = 60;

export default async function TopCoins () {

    const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );
    const cryptoData = await res.json();

    return (
        <div className='my-2'>
            <TopCoinsMarquee data={cryptoData} />
        </div>
    )
}

