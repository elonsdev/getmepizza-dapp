import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./libs/context";
import { useUserData } from "./libs/hooks";
import "@rainbow-me/rainbowkit/styles.css";
import { Chain } from "@rainbow-me/rainbowkit";
import {
  getDefaultWallets,
  RainbowKitProvider,
  DisclaimerComponent,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "./components/navbar";

import { useState, useEffect } from "react";
import Router from "next/router";
import PageLoader from "./components/PageLoader";

import { motion } from "framer-motion";

const binanceChain: Chain = {
  id: 97,
  name: "BSC Testnet",
  network: "BinanceSmartChain",
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/2048px-Binance_Logo.svg.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Smart Chain - Testnet",
    symbol: "TBNB",
  },
  rpcUrls: {
    default: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  blockExplorers: {
    default: { name: "BSCScan", url: "https://testnet.bscscan.com" },
    etherscan: { name: "BSCScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};

const fantomChain: Chain = {
  id: 4002,
  name: "Fantom Testnet",
  network: "Fantom Testnet",
  iconUrl: "https://cryptologos.cc/logos/fantom-ftm-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom Testnet",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://rpc.testnet.fantom.network/",
  },
  blockExplorers: {
    default: { name: "FTMScan", url: "https://testnet.ftmscan.com/" },
    etherscan: { name: "FTMScan", url: "https://testnet.ftmscan.com/" },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.polygonMumbai, binanceChain, fantomChain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "GetMe.Pizza",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href='https://getme.pizza/terms'>Terms of Service</Link> and
    acknowledge you have read and understand the protocol{" "}
    <Link href='https://github.com/elonsdev/getmepizza-dapp/blob/main/contract/getmepizza.sol'>
      Disclaimer
    </Link>
  </Text>
);

function MyApp({ Component, pageProps, router }) {
  const [darkMode, setDarkMode] = useState(false);
  const changeMode = (arg) => {
    setDarkMode(arg);
  };

  const userData = useUserData();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <div className={darkMode ? "dark " : ""}>
      <div className=' dark:bg-zinc-900 dark:text-slate-50 min-h-screen'>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            appInfo={{
              appName: "GetMe.🍕",
              learnMoreUrl: "https://getme.pizza/faq",
              disclaimer: Disclaimer,
            }}
          >
            <UserContext.Provider value={userData}>
              <NavBar changeMode={changeMode} darkMode={darkMode} />

              <motion.div
                key={router.route}
                initial='initial'
                animate='animate'
                transition={{
                  duration: 0.6,
                }}
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  animate: {
                    opacity: 1,
                  },
                }}
              >
                {loading ? (
                  <PageLoader />
                ) : (
                  <>
                    <Component {...pageProps} />{" "}
                  </>
                )}
              </motion.div>

              <Toaster />
            </UserContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    </div>
  );
}

export default MyApp;
