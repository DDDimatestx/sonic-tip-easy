import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorDashboard } from '@/components/CreatorDashboard';
import { useNavigate } from 'react-router-dom';
import { Coins, Zap, Users, Gift } from 'lucide-react';
import heroImage from '@/assets/tip-jar-hero.jpg';

// Demo contract address - in production, this would be deployed
const DEMO_CONTRACT = "0x1234567890123456789012345678901234567890";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Instant Tips",
      description: "One-click micro-payments with MetaMask. Fast and secure on Sonic blockchain."
    },
    {
      icon: Users,
      title: "For Creators",
      description: "Perfect for Twitter, YouTube, Telegram content creators. No complex setup."
    },
    {
      icon: Gift,
      title: "Low Fees",
      description: "Powered by Sonic's ultra-fast, low-cost blockchain technology."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent">
                    Sonic Tip Jar
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The simplest way to receive crypto tips for your content. 
                  One link, infinite possibilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="h-14 px-8"
                  onClick={() => navigate('/dashboard')}
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Start Earning Tips
                </Button>
                <Button 
                  variant="glass" 
                  size="lg" 
                  className="h-14 px-8"
                  onClick={() => navigate('/demo')}
                >
                  Try Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Sonic Blockchain
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  MetaMask Ready
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <img 
                src={heroImage} 
                alt="Sonic Tip Jar" 
                className="relative rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Sonic Tip Jar?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the next generation of content creators who want to monetize their work seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of creators already using Sonic Tip Jar to monetize their content.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="h-14 px-12 text-lg"
              onClick={() => navigate('/dashboard')}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
