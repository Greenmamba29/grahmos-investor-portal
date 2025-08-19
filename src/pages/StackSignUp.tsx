import React from 'react';
import { SignUp } from "@stackframe/stack";
import { stackClientApp } from "../stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StackSignUp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-blue-100">
              Get full access to /GRAHMOS platform and investor tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Spread the Word & Earn Rewards</h2>
          <p className="text-blue-100">
            Invite others to join the movement and earn exclusive benefits
          </p>
        </div>
      </div>
    </div>
  );
};

export default StackSignUp;
