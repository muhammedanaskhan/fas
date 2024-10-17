'use client'
import React from 'react'
import Logo from '@/assets/Logo.svg'
import search from '@/assets/search.svg'
import hamburger from '@/assets/hamburger.svg'

import Image from 'next/image'
import { Input } from '../ui/input'

const Topbar = () => {

    const [searchTerm, setSearchTerm] = React.useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="px-[50px] border-b-[2px] border-[#6B7280] border-opacity-[20%]">
            <div className='flex h-[107px] py-[28.5px] justify-between '>
                <Image src={Logo} alt='Logo' width={117} height={43} className='' />
                <div className="input-div relative w-full max-w-[460px]">
                    <Input
                        className="bg-[#FFFFFF] placeholder:text-[#666464] text-white border-none focus:outline-none text-[20px] bg-opacity-[2%] rounded-[8px] h-[50px] w-full max-w-[460px] pr-[48px]"
                        value={searchTerm}
                        onChange={handleSearch} // Search handler
                        placeholder="Search Duels"
                    />
                    <Image src={search} alt='search' width={28} height={28} className='absolute top-1/2 right-5 transform -translate-y-1/2' />
                </div>
                <div className="flex items-center">
                    <Image src={hamburger} alt='hamburger' width={32} height={32} className='cursor-pointer' />
                </div>

            </div>
        </div>

    )
}

export default Topbar