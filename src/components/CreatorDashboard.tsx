import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, Coins, Wallet } from 'lucide-react';

interface CreatorDashboardProps {
  contractAddress: string;
}

export const CreatorDashboard = ({ contractAddress }: CreatorDashboardProps) => {
  const [tipBalance, setTipBalance] = useState('0');
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const { isConnected, account, isCorrectNetwork, connectWallet, switchToSonic, claimTips, getTipBalance } = useWeb3();
  const { toast } = useToast();

  const updateBalance = async () => {
    if (account && isConnected) {
      const balance = await getTipBalance(account, contractAddress);
      setTipBalance(balance);
    }
  };

  useEffect(() => {
    updateBalance();
    // Auto-refresh balance every 30 seconds
    const interval = setInterval(updateBalance, 30000);
    return () => clearInterval(interval);
  }, [account, isConnected]);

  const handleClaim = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      const switched = await switchToSonic();
      if (!switched) {
        toast({
          title: "Network Error",
          description: "Please switch to Sonic Testnet to claim tips.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsClaimLoading(true);
    try {
      const receipt = await claimTips(contractAddress);
      
      toast({
        title: "Tips Claimed Successfully! 🎉",
        description: `You claimed ${tipBalance} S`,
      });

      await updateBalance();
    } catch (error: any) {
      console.error('Claim failed:', error);
      toast({
        title: "Claim Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClaimLoading(false);
    }
  };

  const copyTipLink = () => {
    if (!account) return;
    
    const tipUrl = `${window.location.origin}/tip/${account}`;
    navigator.clipboard.writeText(tipUrl);
    toast({
      title: "Link Copied!",
      description: "Your tip link has been copied to clipboard",
    });
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (!isCorrectNetwork) return "Switch to Sonic";
    if (isClaimLoading) return "Claiming...";
    return "Claim Tips";
  };

  const getButtonVariant = () => {
    if (!isConnected) return "hero";
    if (!isCorrectNetwork) return "outline";
    return "tip";
  };

  return (
    <div className="space-y-6">
      <Card className="animate-float">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-primary/10 backdrop-blur-sm">
              <Coins className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Creator Dashboard
          </CardTitle>
          <CardDescription>
            Manage your tip jar and claim your earnings
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-gradient-primary/10 backdrop-blur-sm border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-2">Available Tips</h3>
              <p className="text-3xl font-bold text-foreground">{tipBalance} S</p>
              <p className="text-sm text-muted-foreground mt-1">Ready to claim</p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-gold/10 backdrop-blur-sm border border-accent/20">
              <h3 className="text-lg font-semibold text-accent mb-2">Network</h3>
              <p className="text-xl font-bold text-foreground">Sonic Testnet</p>
              <p className="text-sm text-muted-foreground mt-1">Fast & low fees</p>
            </div>
          </div>

          <Button 
            onClick={handleClaim} 
            disabled={isClaimLoading || parseFloat(tipBalance) === 0}
            variant={getButtonVariant()}
            size="lg"
            className="w-full h-12"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>

          {isConnected && account && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 backdrop-blur-sm border border-primary/10">
                <h4 className="font-semibold mb-2">Your Tip Link</h4>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-background/50 rounded text-sm break-all">
                    {window.location.origin}/tip/{account}
                  </code>
                  <Button onClick={copyTipLink} variant="glass" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Share this link on Twitter, YouTube, or Telegram to receive tips
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
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
    </div>
  );
};