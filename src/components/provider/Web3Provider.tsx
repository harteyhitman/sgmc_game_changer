'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

type Web3ContextType = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
};

const Web3Context = createContext<Web3ContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  account: null,
  isConnected: false,
  chainId: null,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const network = await provider.getNetwork();
        
        setAccount(accounts[0]);
        setChainId(Number(network.chainId));
        
        // Set up listeners
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(Number(chainId));
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet,
        account,
        isConnected: !!account,
        chainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);