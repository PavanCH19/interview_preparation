import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Lightbulb } from 'lucide-react';

export const CareerCTA = () => {
  const [selectedPath, setSelectedPath] = useState(null); // 'current' | 'suggested' | null

  return (
    <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
          <p className="text-lg text-indigo-100">
            Choose your path forward and start building your future today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Continue Current Path */}
          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              selectedPath === 'current' 
                ? 'ring-4 ring-white bg-white/20' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => setSelectedPath('current')}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Continue with Backend Development
                </h3>
                <p className="text-blue-100 text-sm">
                  Focus on improving Docker and API Design skills to reach your goal
                </p>
              </div>
              <Button 
                className={`w-full ${
                  selectedPath === 'current'
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Target className="h-4 w-4 mr-2" />
                Stick to Current Path
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Switch to Suggested Path */}
          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              selectedPath === 'suggested' 
                ? 'ring-4 ring-white bg-white/20' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            onClick={() => setSelectedPath('suggested')}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Switch to Full Stack Development
                </h3>
                <p className="text-blue-100 text-sm">
                  Leverage your JavaScript skills for a 89% match with minimal upskilling
                </p>
              </div>
              <Button 
                className={`w-full ${
                  selectedPath === 'suggested'
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Switch to Suggested Role
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {selectedPath && (
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              {selectedPath === 'current' 
                ? 'Create Learning Plan for Backend Development'
                : 'Explore Full Stack Development Path'
              }
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 