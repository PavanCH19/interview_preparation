
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Cloud, Code, Database, ArrowRight } from 'lucide-react';

interface Role {
  id: number;
  title: string;
  matchScore: number;
  upskillEffort: string;
  requiredSkills: string[];
  description: string;
}

interface AlternativeRolesProps {
  roles: Role[];
}

export const AlternativeRoles = ({ roles }: AlternativeRolesProps) => {
  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRoleIcon = (title: string) => {
    if (title.toLowerCase().includes('devops')) return <Cloud className="h-6 w-6" />;
    if (title.toLowerCase().includes('data')) return <Database className="h-6 w-6" />;
    return <Code className="h-6 w-6" />;
  };

  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-600" />
            Better-Fit Roles for Your Profile
          </CardTitle>
          <p className="text-gray-600">
            Based on your current skills, these roles might be a better match
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {getRoleIcon(role.title)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{role.title}</h3>
                      <div className={`text-2xl font-bold ${getMatchColor(role.matchScore)}`}>
                        {role.matchScore}%
                      </div>
                    </div>
                  </div>

                  <Progress value={role.matchScore} className="mb-4 h-2" />

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Upskill Effort:</span>
                      <Badge className={getEffortColor(role.upskillEffort)}>
                        {role.upskillEffort}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700">{role.description}</p>
                  </div>

                  <Button className="w-full" variant="outline">
                    Explore This Path
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why These Were Suggested */}
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Why were these roles suggested?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Missing Critical Skills</h4>
                <p className="text-sm text-red-700">
                  Docker and API Design gaps make Backend Development challenging
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Experience Match</h4>
                <p className="text-sm text-blue-700">
                  Your JavaScript and Database skills align better with Full Stack roles
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
