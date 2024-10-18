import React from 'react';

const BattleVoteBars = ({ votesOn10 }: any) => {
    const barColor = votesOn10 < 5 ? 'bg-[#E84749]' : 'bg-[#95DE64]';
    const bars = Array.from({ length: 10 });

    return (
        <div className="flex space-x-1">
            {bars.map((_, index) => (
                <div
                    key={index}
                    className={`w-[4.40px] h-[13px] rounded-[10px] ${index < votesOn10 ? barColor : 'bg-[#6B7280] bg-opacity-[30%]'}`} // Fill based on votesOn10
                ></div>
            ))}
        </div>
    );
};

export default BattleVoteBars;
