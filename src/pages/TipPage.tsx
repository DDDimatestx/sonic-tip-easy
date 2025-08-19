import { useParams, useNavigate } from 'react-router-dom';
import { TipButton } from '@/components/TipButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ExternalLink } from 'lucide-react';

// Demo contract address - in production, this would be deployed
const DEMO_CONTRACT = "0x1234567890123456789012345678901234567890";

const TipPage = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();

  if (!address) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Invalid Tip Link</h1>
          <p className="text-muted-foreground">The tip link you followed is not valid.</p>
          <Button onClick={() => navigate('/')} variant="hero">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="glass" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <Button 
            variant="glass" 
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Send a Tip
            </h1>
            <p className="text-muted-foreground">
              Support this creator with a Sonic tip
            </p>
            <div className="p-3 bg-muted/20 rounded-lg border border-primary/10 text-sm">
              <span className="text-muted-foreground">Recipient: </span>
              <code className="text-foreground font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </code>
            </div>
          </div>

          <TipButton 
            recipientAddress={address}
            contractAddress={DEMO_CONTRACT}
            tipAmount="0.1"
          />

          <div className="mt-8 text-center space-y-4">
            <div className="p-4 bg-gradient-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-semibold mb-2 text-primary">How it works</h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Connect your MetaMask wallet</li>
                <li>• Confirm the tip transaction</li>
                <li>• Creator can claim tips anytime</li>
                <li>• All powered by Sonic blockchain</li>
              </ul>
            </div>

            <div className="text-center">
              <a
                href="https://testnet.soniclabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:text-primary-glow transition-colors"
              >
                Learn more about Sonic
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipPage;