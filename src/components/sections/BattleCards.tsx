import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import moo from '@/assets/moo.png'
import trump from '@/assets/trump.png'
import kamala from '@/assets/kamala.png'
import gam from '@/assets/gam.png'

interface BattleCardsProps {
    category: string;
    phase: string;
}

const PHASES = ['bootstrapping', 'live-duels', 'completed'];
const PHASE_DURATIONS = [30000, 60000, 30000];

const BattleCards = ({ category, phase }: BattleCardsProps) => {

    const [battles, setBattles] = useState([
        { id: 1, name: 'Will $MOO Hit $1.00 ', image: moo, category: 'crypto', currentPhase: 0, timeLeft: PHASE_DURATIONS[0] },
        { id: 2, name: 'Will Trump Win US Election', image: trump, category: 'us-election', currentPhase: 0, timeLeft: PHASE_DURATIONS[0] },
        { id: 3, name: 'Will Kamala Harris Win US Election', image: kamala, category: 'us-election', currentPhase: 0, timeLeft: PHASE_DURATIONS[0] },
        { id: 4, name: 'Will GAM win Worlds 2024', image: gam, category: 'sports', currentPhase: 0, timeLeft: PHASE_DURATIONS[0] },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setBattles(prevBattles =>
                prevBattles.map(battle => {
                    if (battle.currentPhase >= PHASES.length - 1) return battle;

                    const newTimeLeft = battle.timeLeft - 1000;
                    if (newTimeLeft <= 0) {
                        const nextPhase = battle.currentPhase + 1;
                        return {
                            ...battle,
                            currentPhase: nextPhase,
                            timeLeft: PHASE_DURATIONS[nextPhase]
                        };
                    }
                    return { ...battle, timeLeft: newTimeLeft };
                })
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    console.log("battles", battles, "phase", phase);

    const filteredBattles = battles.filter(battle =>
        (category === 'all-duels' || category === battle.category) &&
        (PHASES[battle.currentPhase] === phase)
    );
    console.log("filteredBattles", filteredBattles);

    return (
        <div className="flex flex-wrap gap-4 mt-[11px] px-[50px] text-white">
            {filteredBattles.map(battle => (
                <div className='bg-[#1A1A1A] rounded-[12px] p-3 flex flex-col w-[281.25px] h-[216px]'>
                    <div className="profile flex max-w-[227px] gap-2 mx-auto">
                        <Image src={battle.image} alt={battle.name} width={64} height={64} />
                        <span className="text-[16px]">{battle.name}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BattleCards