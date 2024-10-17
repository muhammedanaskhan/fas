import React from 'react'

export const revalidate = 60;

const TopCoins = async () => {

    const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );
    const cryptoData = await res.json();

    return (
        <div>TopCoins</div>
    )
}

export default TopCoins