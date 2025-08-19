import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="w-full max-w-md text-center">
        <Card className="glass-morphism border-white/20 bg-black/20 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
              <p className="text-white/70">
                You don't have permission to access this page.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;