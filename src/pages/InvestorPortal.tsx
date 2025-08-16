import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InvestorPortal = () => {
  const { slug } = useParams();
  const [pre, setPre] = useState(5000000); // $5M
  const [ticket, setTicket] = useState(1000000); // $1M
  const [cap, setCap] = useState(8000000); // $8M
  const [discount, setDiscount] = useState(20); // 20%

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => window.history.back()}
              className="border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {slug || 'Investor'}</h1>
              <p className="text-white/70">Your Private Grahmos Investor Portal</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">Portal Access</p>
            <p className="text-lg font-semibold">Active</p>
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Contact Team
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
