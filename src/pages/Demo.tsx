import { TipButton } from '@/components/TipButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Info } from 'lucide-react';

// Demo contract and recipient addresses
const DEMO_CONTRACT = "0x1234567890123456789012345678901234567890";
const DEMO_RECIPIENT = "0x742d35Cc6475C6E7CC4D5A2cb3e572b07C8C7373";

const Demo = () => {
  const navigate = useNavigate();

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

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sonic Tip Jar Demo
            </h1>
            <p className="text-muted-foreground">
              Try sending a tip using the demo below. This is how your tip button will look to your audience.
            </p>
          </div>

          <Card className="bg-gradient-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Demo Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Network:</strong> Sonic Testnet</p>
              <p><strong>Demo Recipient:</strong> <code className="bg-background/50 px-1 rounded">{DEMO_RECIPIENT.slice(0, 12)}...{DEMO_RECIPIENT.slice(-8)}</code></p>
              <p><strong>Tip Amount:</strong> 0.1 S (~$0.10)</p>
              <p className="text-muted-foreground mt-2">
                This is a demo using testnet tokens. No real money will be transferred.
              </p>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-br from-muted/20 to-background p-8 rounded-2xl border border-primary/10">
            <TipButton 
              recipientAddress={DEMO_RECIPIENT}
              recipientName="Demo Creator"
              contractAddress={DEMO_CONTRACT}
              tipAmount="0.1"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How to integrate this into your content</CardTitle>
              <CardDescription>
                Share your tip link across all your platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Twitter/X</h4>
                <p className="text-sm text-muted-foreground">
                  Add your tip link to your bio or include it in your tweets: "Support my content: [your-link]"
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">YouTube</h4>
                <p className="text-sm text-muted-foreground">
                  Include your tip link in video descriptions and channel about section
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Telegram</h4>
                <p className="text-sm text-muted-foreground">
                  Pin your tip link in channel description or include in posts
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="h-12 px-8"
            >
              Create Your Own Tip Jar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;