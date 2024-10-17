import React from 'react'

import allDuels from '@/assets/allduels.svg'
import allDuelsSelected from '@/assets/allduels-selected.svg'
import uselectionsSelected from '@/assets/uselections1.svg'
import uselections from '@/assets/uselections.svg'
import crypto from '@/assets/crypto.svg'
import cryptoSelected from '@/assets/crypto1.svg'
import sports from '@/assets/sports.svg'
import sportsSelected from '@/assets/sports1.svg'

import Image from 'next/image';

interface CategorySelectorsProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const categories = [
    {
        name: 'all-duels',
        label: 'All Duels',
        assetSelected: allDuelsSelected,
        asset: allDuels,
        assetDimension: 169,
    },
    {
        name: 'us-election',
        label: 'US Election',
        assetSelected: uselectionsSelected,
        asset: uselections,
        assetDimension: 223
    },
    {
        name: 'crypto',
        label: 'Crypto',
        assetSelected: cryptoSelected,
        asset: crypto,
        assetDimension: 223

    },
    {
        name: 'sports',
        label: 'Sports',
        assetSelected: sportsSelected,
        asset: sports,
        assetDimension: 186
    }
];

const CategorySelectors = ({ selectedCategory, setSelectedCategory }: CategorySelectorsProps) => {


    return (
        <div className='flex gap-4 px-[50px] overflow-x-auto sm:overflow-visible'>
            {categories.map((category, i: number) => (
                <div
                    key={i}
                    onClick={() => setSelectedCategory(category.name)}
                    className={` flex-shrink-0 cursor-pointer hover:scale-[1.05] transition ease-out duration-100 relative overflow-hidden w-[283px] h-[179px] categoryCardBg rounded-[12px] border-[2px] ${selectedCategory === category.name ? 'text-[#FA764C] border-[#FA764C] categoryCardSelectedShadow' : 'text-[#444649] border-[#44464C]'} `}
                >
                    <Image
                        src={selectedCategory === category.name ? category.assetSelected : category.asset}
                        alt={category.name}
                        className={`absolute w-[${category.assetDimension}px] right-0 object-cover h-[${category.assetDimension}px] inline-block ${selectedCategory === category.name ? 'fill-white' : 'fill-[#1A1A1A]'}`}
                    />
                    <span className="absolute text-[35px] font-semibold bottom-2 left-4">{category.label}</span>
                </div>
            ))
            }
        </div>
    )
}

export default CategorySelectors