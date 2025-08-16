import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Sparkles, Shield, Mail } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const InvestorPortal = () => {
  const { slug } = useParams();
  const [mounted, setMounted] = useState(false);
  const [pre, setPre] = useState(5000000); // $5M
  const [ticket, setTicket] = useState(1000000); // $1M
  const [cap, setCap] = useState(8000000); // $8M
  const [discount, setDiscount] = useState(20); // 20%
  
  useEffect(() => {
    setMounted(true);
    // Welcome toast with smooth animation
    toast.success(`Welcome to your portal, ${slug || 'Investor'}!`, {
      description: 'Your private Grahmos investor dashboard is now active',
      duration: 5000,
    });
  }, [slug]);

  // SAFE calculation
  const effectivePrice = Math.min(cap * (1 - discount/100), pre + ticket);
  const sharesFromInvestment = ticket / effectivePrice * (pre + ticket);
  const totalShares = pre + ticket + sharesFromInvestment;
  const ownership = (sharesFromInvestment / totalShares) * 100;

  const chartData = [
    { name: 'Your Ownership', value: ownership, fill: '#3b82f6' },
    { name: 'Existing', value: 100 - ownership, fill: '#94a3b8' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleContactTeam = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Connecting you with our team...',
        success: 'Contact request sent! We\'ll get back to you within 24 hours.',
        error: 'Failed to send contact request. Please try again.',
        duration: 5000,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 transition-all duration-1000 ${mounted ? 'animate-slide-up opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.history.back()}
              className="border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome, {slug || 'Investor'}
              </h1>
              <p className="text-sm sm:text-base text-white/70">Your Private Grahmos Investor Portal</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30 mb-2">
              <Shield className="h-3 w-3 mr-1" />
              Portal Access Active
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/60">Live Session</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* SAFE Simulator */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Calculator className="h-5 w-5" />
                  <span>SAFE Investment Simulator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Pre-money Valuation: {formatCurrency(pre)}
                      </label>
                      <Slider
                        value={[pre]}
                        onValueChange={(value) => setPre(value[0])}
                        min={1000000}
                        max={50000000}
                        step={500000}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Investment Amount: {formatCurrency(ticket)}
                      </label>
                      <Slider
                        value={[ticket]}
                        onValueChange={(value) => setTicket(value[0])}
                        min={100000}
                        max={5000000}
                        step={50000}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Valuation Cap: {formatCurrency(cap)}
                      </label>
                      <Slider
                        value={[cap]}
                        onValueChange={(value) => setCap(value[0])}
                        min={1000000}
                        max={100000000}
                        step={1000000}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Discount: {discount}%
                      </label>
                      <Slider
                        value={[discount]}
                        onValueChange={(value) => setDiscount(value[0])}
                        min={0}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Ownership Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Ownership']}
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Ownership Result */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Ownership</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {ownership.toFixed(2)}%
                  </div>
                  <p className="text-white/70">of Grahmos</p>
                </div>
              </CardContent>
            </Card>

            {/* Investment Summary */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <DollarSign className="h-5 w-5" />
                  <span>Investment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Investment:</span>
                  <span className="text-white font-semibold">{formatCurrency(ticket)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Pre-money:</span>
                  <span className="text-white font-semibold">{formatCurrency(pre)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Valuation Cap:</span>
                  <span className="text-white font-semibold">{formatCurrency(cap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Discount:</span>
                  <span className="text-white font-semibold">{discount}%</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between text-lg">
                  <span className="text-white/70">Ownership:</span>
                  <span className="text-blue-400 font-bold">{ownership.toFixed(2)}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-white mb-3">Questions?</h3>
                <p className="text-sm text-white/70 mb-4">
                  Contact our investor relations team for more information about Grahmos.
                </p>
                <Button 
                  onClick={handleContactTeam}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Team</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-white/60">
          <p className="text-sm">
            This portal is for demonstration purposes. Actual investment terms may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestorPortal;
