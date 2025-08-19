import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';

// Sonic Testnet configuration
const SONIC_TESTNET = {
  chainId: '0xFAA5', // 64165 in hex
  chainName: 'Sonic Testnet',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.soniclabs.com/'],
  blockExplorerUrls: ['https://testnet.soniclabs.com/'],
};

// Simple tip jar contract ABI
const TIP_JAR_ABI = [
  "function sendTip(address recipient) external payable",
  "function claimTips() external",
  "function getTipBalance(address recipient) external view returns (uint256)",
  "function tips(address) external view returns (uint256)",
  "event TipSent(address indexed sender, address indexed recipient, uint256 amount)"
];

interface Web3State {
  isConnected: boolean;
  account: string | null;
  balance: string;
  isCorrectNetwork: boolean;
}

export const useWeb3 = () => {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    account: null,
    balance: '0',
    isCorrectNetwork: false,
  });
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const checkNetwork = useCallback(async (provider: BrowserProvider) => {
    try {
      const network = await provider.getNetwork();
      return network.chainId === BigInt(64165); // Sonic Testnet
    } catch (error) {
      console.error('Network check failed:', error);
      return false;
    }
  }, []);

  const switchToSonic = useCallback(async () => {
    if (!window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SONIC_TESTNET.chainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SONIC_TESTNET],
          });
          return true;
        } catch (addError) {
          console.error('Failed to add Sonic network:', addError);
          return false;
        }
      }
      console.error('Failed to switch to Sonic network:', switchError);
      return false;
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const balance = await provider.getBalance(accounts[0]);
        const isCorrectNetwork = await checkNetwork(provider);

        setState({
          isConnected: true,
          account: accounts[0],
          balance: formatEther(balance),
          isCorrectNetwork,
        });

        setProvider(provider);

        if (!isCorrectNetwork) {
          await switchToSonic();
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [checkNetwork, switchToSonic]);

  const sendTip = useCallback(async (recipientAddress: string, tipAmount: string, contractAddress: string) => {
    if (!provider || !state.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, TIP_JAR_ABI, signer);
      
      const tx = await contract.sendTip(recipientAddress, {
        value: parseEther(tipAmount)
      });
      
      return await tx.wait();
    } catch (error) {
      console.error('Failed to send tip:', error);
      throw error;
    }
  }, [provider, state.isConnected]);

  const claimTips = useCallback(async (contractAddress: string) => {
    if (!provider || !state.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, TIP_JAR_ABI, signer);
      
      const tx = await contract.claimTips();
      return await tx.wait();
    } catch (error) {
      console.error('Failed to claim tips:', error);
      throw error;
    }
  }, [provider, state.isConnected]);

  const getTipBalance = useCallback(async (recipientAddress: string, contractAddress: string) => {
    if (!provider) return '0';

    try {
      const contract = new Contract(contractAddress, TIP_JAR_ABI, provider);
      const balance = await contract.getTipBalance(recipientAddress);
      return formatEther(balance);
    } catch (error) {
      console.error('Failed to get tip balance:', error);
      return '0';
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setState(prev => ({ ...prev, isConnected: false, account: null }));
          setProvider(null);
        } else {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [connectWallet]);

  return {
    ...state,
    connectWallet,
    switchToSonic,
    sendTip,
    claimTips,
    getTipBalance,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}