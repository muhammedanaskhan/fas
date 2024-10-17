import React from 'react'

interface PhaseSelectorsProps {
    selectedPhase: string;
    setSelectedPhase: (phase: string) => void;
}


const phases = [
    {
        name: 'live-duels',
        label: 'Live Duels',
    },
    {
        name: 'bootsrapping',
        label: 'Bootsrapping',
    },
    {
        name: 'completed',
        label: 'Completed',
    }
];

const PhaseSelectors = ({ selectedPhase, setSelectedPhase }: PhaseSelectorsProps) => {
    return (
        <div className='px-[50px] mt-4 '>
            <div className="bg-[#151515] bg-opacity-100 p-1 border-[1px] border-[#FFFFFF] border-opacity-[5%] w-fit rounded-[9px]">
                <div className='flex gap-4 overflow-x-auto sm:overflow-visible'>
                    {phases.map((phase, i: number) => (
                        <div
                            key={i}
                            onClick={() => setSelectedPhase(phase.name)}
                            className={`cursor-pointer hover:scale-[1.05] px-[10px] py-[7px] transition ease-out duration-100 relative overflow-hidden rounded-[7px] ${selectedPhase === phase.name ? 'selectedPhaseBg' : 'bg-transparent'} `}
                        >
                            <div className='text-white text-[16px]'>{phase.label}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default PhaseSelectors