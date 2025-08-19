import React from 'react';
import { SignIn } from "@stackframe/stack";
import { stackClientApp } from "../stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StackSignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Access your /GRAHMOS account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StackSignIn;
