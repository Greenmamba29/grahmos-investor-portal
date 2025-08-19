import { useState } from 'react';
import { useUser } from '@stackframe/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/stack-api';

export default function AuthTest() {
  const stackUser = useUser();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAuthEndpoint = async () => {
    setLoading(true);
    try {
      if (stackUser) {
        console.log('Stack user exists:', stackUser);
        const token = await stackUser.getIdToken();
        console.log('Got token:', token ? 'Yes' : 'No');
        
        const response = await apiRequest.get('/.netlify/functions/test-auth', token);
        const data = await response.json();
        console.log('Test response:', data);
        setTestResult(data);
      } else {
        setTestResult({ error: 'No Stack user found' });
      }
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Auth Test</h1>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Stack User Status</h3>
                <pre className="bg-black/50 p-4 rounded text-green-400 text-sm">
                  {JSON.stringify({
                    isSignedIn: !!stackUser,
                    email: stackUser?.primaryEmail,
                    id: stackUser?.id,
                    verified: stackUser?.primaryEmailVerified
                  }, null, 2)}
                </pre>
              </div>

              <Button 
                onClick={testAuthEndpoint}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Testing...' : 'Test Auth Endpoint'}
              </Button>

              {testResult && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Test Result</h3>
                  <pre className="bg-black/50 p-4 rounded text-green-400 text-sm overflow-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
