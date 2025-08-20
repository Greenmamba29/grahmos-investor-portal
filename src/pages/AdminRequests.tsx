import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface Application {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  status: 'pending' | 'approved' | 'denied';
  pitch: string;
  accreditation: boolean;
  created_at: string;
  decided_at?: string;
  decided_by_email?: string;
}

export default function AdminRequests() {
  const navigate = useNavigate();
  // Mock user - Stack Auth temporarily disabled
  const stackUser = null;
  const [user] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number | null>(null);

  useEffect(() => {
    // Stack Auth temporarily disabled
    toast.error('Authentication is temporarily disabled. Admin access unavailable.');
    setLoading(false);
  }, []);

  const loadApplications = async () => {
    // Stack Auth temporarily disabled - no API calls
    return;
  };

  const handleDecision = async (applicationId: number, decision: 'approved' | 'denied') => {
    // Stack Auth temporarily disabled - no API calls
    toast.error('Authentication is temporarily disabled. Admin functions unavailable.');
    return;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'denied':
        return <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="h-3 w-3 mr-1" />Denied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
            <p className="text-white/70">You need admin privileges to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="text-white/70 hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Access Portal
        </Button>

        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70">Manage investor applications</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-white/70">
            <span>Welcome, {user.firstName || user.email}</span>
            <span>•</span>
            <span>{applications.length} total applications</span>
            <span>•</span>
            <span>{applications.filter(app => app.status === 'pending').length} pending review</span>
          </div>
        </div>

        {applications.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
              <p className="text-white/70">Investor applications will appear here when submitted.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {app.first_name} {app.last_name}
                        </h3>
                        {getStatusBadge(app.status)}
                        {app.accreditation && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Accredited
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/70 text-sm mb-1">{app.email}</p>
                      <p className="text-white/50 text-xs">
                        Applied: {formatDate(app.created_at)}
                        {app.decided_at && (
                          <span> • Decided: {formatDate(app.decided_at)} by {app.decided_by_email}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {app.pitch && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="text-white/80 text-sm font-medium mb-2">Investment Pitch:</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{app.pitch}</p>
                    </div>
                  )}

                  {app.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleDecision(app.id, 'approved')}
                        disabled={processing === app.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {processing === app.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDecision(app.id, 'denied')}
                        disabled={processing === app.id}
                        variant="destructive"
                      >
                        {processing === app.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Deny
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
