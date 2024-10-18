import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { createConnector as createWagmiConnector } from "wagmi";

const clientId =
    "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1", // Please use 0x1 for Mainnet
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorerUrl: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3AuthInstance = new Web3Auth({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
    uiConfig: {
        mode: "dark",
        useLogoLoader: true,
        logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        defaultLanguage: "en",
        theme: {
            primary: "#768729",
        },
        uxMode: UX_MODE.REDIRECT,
        modalZIndex: "2147483647"
    }
});

export const rainbowWeb3AuthConnector = (): Wallet => ({
    id: "web3auth",
    name: "Web3auth",
    rdns: "web3auth",
    iconUrl: "https://web3auth.io/images/web3authlog.png",
    iconBackground: "#fff",
    installed: true,
    downloadUrls: {},
    createConnector: (walletDetails: WalletDetailsParams) =>
        createWagmiConnector((config) => ({
            ...Web3AuthConnector({
                web3AuthInstance,
            })(config),
            ...walletDetails,
        })),
});