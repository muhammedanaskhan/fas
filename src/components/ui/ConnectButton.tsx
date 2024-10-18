import { ConnectButton } from '@rainbow-me/rainbowkit';
import coin from '@/assets/coin.svg';
import Image from 'next/image';

export const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <>
                                        <button onClick={openConnectModal} type="button" className='selectedPhaseBg w-[125px] h-[50px] text-[16px] yesBtnShadow rounded-[8px] border-[2px] border-white border-opacity-[20%]'>
                                            Connect
                                        </button>
                                    </>

                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    {/* <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button> */}
                                    <div className="relative bg-white bg-opacity-[2%] text-[#666464] border-[2px] border-white border-opacity-[5%] rounded-[8px]">
                                        <Image src={coin} alt="coin" width={18} height={18} className='absolute top-1/2 left-[8px] transform -translate-y-1/2' />
                                        <input type="number" className="text-[15px] bg-transparent h-full focus:outline-none text-white pl-[34px]" />
                                        <button className="selectedPhaseBg text-[16px] text-black p-[10px] rounded-[4px] yesBtnShadow border-[2px] border-white border-opacity-[20%]">Deposit</button>
                                    </div>
                                    <button className="selectedPhaseBg text-[20px] text-black p-[10px] rounded-[8px] yesBtnShadow border-[2px] border-white border-opacity-[20%]">Create Duel</button>
                                    <button onClick={openAccountModal} className='bg-white bg-opacity-[2%] text-[#666464] text-[10px] border-[2px] border-white border-opacity-[5%] w-[134px] h-[50px] rounded-[8px]' type="button">
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};