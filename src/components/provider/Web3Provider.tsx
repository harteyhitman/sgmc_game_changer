'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';

// Define proper types for Ethereum provider events
type EthereumEventCallback = (...args: unknown[]) => void;

interface EthereumProvider extends ethers.Eip1193Provider {
  on(event: string, listener: EthereumEventCallback): this;
  removeListener(event: string, listener: EthereumEventCallback): this;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type Web3ContextType = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
  provider: ethers.BrowserProvider | null;
};

const Web3Context = createContext<Web3ContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  account: null,
  isConnected: false,
  chainId: null,
  provider: null,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: unknown) => {
    const accountsArray = accounts as string[];
    if (accountsArray.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accountsArray[0]);
    }
  }, [disconnectWallet]);

  const handleChainChanged = useCallback((chainId: unknown) => {
    setChainId(Number(chainId));
  }, []);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await newProvider.send("eth_requestAccounts", []);
        const network = await newProvider.getNetwork();
        
        setAccount(accounts[0]);
        setChainId(Number(network.chainId));
        setProvider(newProvider);
        
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }, [handleAccountsChanged, handleChainChanged]);

  // Initialize provider and check connection status
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await newProvider.send("eth_accounts", []);
          const network = await newProvider.getNetwork();
          
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setChainId(Number(network.chainId));
            setProvider(newProvider);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
          }
        } catch (error) {
          console.error("Error initializing wallet:", error);
        }
      }
    };

    init();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  const contextValue = useMemo(() => ({
    connectWallet,
    disconnectWallet,
    account,
    isConnected: !!account,
    chainId,
    provider,
  }), [connectWallet, disconnectWallet, account, chainId, provider]);

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);