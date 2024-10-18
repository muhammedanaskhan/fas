import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import moo from '@/assets/moo.png'
import trump from '@/assets/trump.png'
import kamala from '@/assets/kamala.png'
import gam from '@/assets/gam.png'
import coing from '@/assets/coin.svg'
import timer from '@/assets/timer.svg'
import kzed from '@/assets/kzed.png'
import flashBets from '@/assets/flash-bets.png'
import randomAcc from '@/assets/random-acc.png'

import BattleVoteBars from '../ui/BattleVoteBars'

interface BattleCardsProps {
    category: string;
    phase: string;
}

const PHASES = ['bootstrapping', 'live-duels', 'completed'];
const PHASE_DURATIONS = [45000, 60000, 60000, 30000];

const BattleCards = ({ category, phase }: BattleCardsProps) => {

    const [battles, setBattles] = useState([
        { id: 1, name: 'Will $MOO Hit $1.00 ', image: moo, category: 'crypto', volume: '200K', votesOn10: 6, currentPhase: 0, timeLeft: PHASE_DURATIONS[0], creator: 'KZED', creatorImage: kzed },
        { id: 2, name: 'Will Trump Win US Election', image: trump, category: 'us-election', volume: '2.6M', votesOn10: 9, currentPhase: 0, timeLeft: PHASE_DURATIONS[1], creator: 'Flash Bets', creatorImage: flashBets },
        { id: 3, name: 'Will Kamala Harris Win US Election', image: kamala, category: 'us-election', volume: '2.6M', votesOn10: 1, currentPhase: 0, timeLeft: PHASE_DURATIONS[2], creator: 'Flash Bets', creatorImage: flashBets },
        { id: 4, name: 'Will GAM win Worlds 2024', image: gam, category: 'sports', volume: '10.45K', votesOn10: 6, currentPhase: 0, timeLeft: PHASE_DURATIONS[3], creator: '0x4743..69fc', creatorImage: randomAcc },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setBattles(prevBattles =>
                prevBattles.map(battle => {
                    if (battle.currentPhase >= PHASES.length - 1) return battle;

                    const newTimeLeft = Math.max(0, battle.timeLeft - 10); // Update every 10ms for smooth millisecond display
                    if (newTimeLeft <= 0) {
                        const nextPhase = battle.currentPhase + 1;
                        return {
                            ...battle,
                            currentPhase: nextPhase,
                            timeLeft: nextPhase < PHASES.length ? PHASE_DURATIONS[nextPhase] : 0
                        };
                    }
                    return { ...battle, timeLeft: newTimeLeft };
                })
            );
        }, 10);

        return () => clearInterval(timer);
    }, []);

    console.log("battles", battles, "phase", phase);

    const filteredBattles = battles.filter(battle =>
        (category === 'all-duels' || category === battle.category) &&
        (PHASES[battle.currentPhase] === phase)
    );
    console.log("filteredBattles", filteredBattles);

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = milliseconds % 1000;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
    };

    const votePercentage = (votesOn10: number) => {
        return votesOn10 * 10;
    }

    return (
        <div className="flex flex-wrap gap-4 mt-[11px] px-[50px] text-white">
            {filteredBattles.map(battle => (
                <div className='bg-[#1A1A1A] rounded-[12px] p-3 flex flex-col w-[281.25px] h-[216px]'>
                    <div className="profile flex w-full max-w-[227px] gap-2 mx-auto">
                        <Image src={battle.image} alt={battle.name} width={64} height={64} />
                        <span className="text-[16px]">{battle.name}</span>
                    </div>
                    <div className="stats h-[36px] mt-[12px] flex w-full justify-between max-w-[227px] gap-2 mx-auto">
                        <div className="flex flex-col gap-1 text-[10px]">
                            <div className="flex gap-1">
                                <Image src={coing} alt="coin" width={16} height={16} />
                                <span>{`Volume: $${battle.volume}`}</span>
                            </div>
                            <div className="flex gap-1">
                                <Image src={timer} alt="coin" width={16} height={16} />
                                <span>{`${formatTime(battle.timeLeft)}`}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 justify-center items-center">
                            <span className={`text-[15px] leading-[16px] font-semibold ${battle.votesOn10 < 5 ? 'text-[#E84749]' : 'text-[#95DE64]'}`}>{`${votePercentage(battle.votesOn10)}%`}</span>
                            <BattleVoteBars votesOn10={battle.votesOn10} />
                        </div>
                    </div>
                    <div className="buttons flex justify-between gap-2 text-[15px] font-semibold mt-3">
                        <button className="bg-[#64DC3A] bg-opacity-[30%] text-[#95DE64] yesBtnShadow flex-1 h-9 rounded-[8px]">YES</button>
                        <button className="bg-[#F32A2C] bg-opacity-[20%] text-[$E84749] yesBtnShadow flex-1 h-9 rounded-[8px]">NO</button>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span className="text-[10px] text-[#9CA3AF]">Created By:</span>

                        <div className="flex gap-2 items-center">
                            <Image src={battle.creatorImage} alt={battle.creator} width={18} height={18} className='rounded-full' />
                            <span className="text-[10px]">{battle.creator}</span>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default BattleCards