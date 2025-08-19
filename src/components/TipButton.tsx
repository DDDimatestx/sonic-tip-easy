import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';
import { Coins, Wallet, ExternalLink } from 'lucide-react';

interface TipButtonProps {
  recipientAddress: string;
  recipientName?: string;
  contractAddress: string;
  tipAmount?: string;
}

export const TipButton = ({ 
  recipientAddress, 
  recipientName = "Content Creator", 
  contractAddress,
  tipAmount = "0.1" 
}: TipButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected, account, isCorrectNetwork, connectWallet, switchToSonic, sendTip } = useWeb3();
  const { toast } = useToast();

  const handleTip = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      const switched = await switchToSonic();
      if (!switched) {
        toast({
          title: "Network Error",
          description: "Please switch to Sonic Testnet to send tips.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      const receipt = await sendTip(recipientAddress, tipAmount, contractAddress);
      
      toast({
        title: "Tip Sent Successfully! 🎉",
        description: `You sent ${tipAmount} S to ${recipientName}`,
      });

      // Optional: Show transaction on explorer
      console.log('Transaction:', `https://testnet.soniclabs.com/tx/${receipt.hash}`);
    } catch (error: any) {
      console.error('Tip failed:', error);
      toast({
        title: "Tip Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (!isCorrectNetwork) return "Switch to Sonic";
    if (isLoading) return "Sending Tip...";
    return `Tip ${tipAmount} S`;
  };

  const getButtonVariant = () => {
    if (!isConnected) return "hero";
    if (!isCorrectNetwork) return "outline";
    return "tip";
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-float">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-gold/10 backdrop-blur-sm">
            <Coins className="h-8 w-8 text-accent" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Support {recipientName}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Send a tip to show your appreciation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/20 backdrop-blur-sm border border-primary/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tip Amount:</span>
            <span className="font-semibold text-accent">{tipAmount} S</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Network:</span>
            <span className="font-semibold text-primary">Sonic Testnet</span>
          </div>
        </div>

        <Button 
          onClick={handleTip} 
          disabled={isLoading}
          variant={getButtonVariant()}
          size="lg"
          className="w-full h-12"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {getButtonText()}
        </Button>

        {isConnected && account && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
        )}

        <div className="text-center">
          <a
            href="https://testnet.soniclabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-primary hover:text-primary-glow transition-colors"
          >
            View on Sonic Explorer
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};