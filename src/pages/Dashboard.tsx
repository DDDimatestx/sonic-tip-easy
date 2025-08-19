import { CreatorDashboard } from '@/components/CreatorDashboard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

// Demo contract address - in production, this would be deployed
const DEMO_CONTRACT = "0x1234567890123456789012345678901234567890";

const Dashboard = () => {
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

        <div className="max-w-2xl mx-auto">
          <CreatorDashboard contractAddress={DEMO_CONTRACT} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;