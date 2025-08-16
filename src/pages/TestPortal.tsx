import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Calendar } from 'lucide-react';
import InvestorPortal from './InvestorPortal';

const TestPortal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Test Info Header */}
        <Card className="bg-white/10 backdrop-blur border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <User className="h-5 w-5" />
              <span>Test Investor Portal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">test.investor@grahmos.info</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-400" />
                <span className="text-sm">Access: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                <span className="text-sm">Portal Status: Active</span>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              This is a test portal for demonstration purposes. All calculations are live and interactive.
            </p>
          </CardContent>
        </Card>

        {/* Main Portal Content */}
        <div className="relative">
          <InvestorPortal />
        </div>
      </div>
    </div>
  );
};

export default TestPortal;
