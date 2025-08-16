
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Skill {
  skill: string;
  userLevel: number;
  requiredLevel: number;
  status: 'strong' | 'moderate' | 'weak';
}

interface CareerFitReportProps {
  targetRole: string;
  matchScore: number;
  userSkills: Skill[];
}

export const CareerFitReport = ({ targetRole, matchScore, userSkills }: CareerFitReportProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'strong':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'moderate':
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'weak':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong':
        return 'text-green-700 bg-green-100';
      case 'moderate':
        return 'text-yellow-700 bg-yellow-100';
      case 'weak':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  // Prepare data for radar chart
  const radarData = userSkills.map(skill => ({
    skill: skill.skill,
    user: skill.userLevel,
    required: skill.requiredLevel,
    fullMark: 100
  }));

  const chartConfig = {
    user: {
      label: "Your Level",
      color: "hsl(var(--chart-1))",
    },
    required: {
      label: "Required Level",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="mb-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Career Fit Report
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Match Score */}
            <div className="space-y-6">
              <div className={`p-6 rounded-lg border-2 ${getScoreBgColor(matchScore)}`}>
                <div className="text-center">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(matchScore)}`}>
                    {matchScore}%
                  </div>
                  <p className="text-lg font-semibold text-gray-700">
                    Match for {targetRole}
                  </p>
                  <Progress value={matchScore} className="mt-4 h-3" />
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Skill Analysis</h3>
                {userSkills.map((skill, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(skill.status)}
                        <span className="font-medium text-gray-900">{skill.skill}</span>
                      </div>
                      <Badge className={getStatusColor(skill.status)}>
                        {skill.status === 'strong' ? 'Satisfied' : 
                         skill.status === 'moderate' ? 'Partial Match' : 'Missing'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Your Level: {skill.userLevel}%</span>
                      <span>Required: {skill.requiredLevel}%</span>
                    </div>
                    <Progress value={(skill.userLevel / skill.requiredLevel) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                Skills vs Requirements
              </h3>
              <ChartContainer config={chartConfig} className="h-80">
                <RadarChart data={radarData}>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    dataKey="user"
                    stroke="var(--color-user)"
                    fill="var(--color-user)"
                    fillOpacity={0.3}
                  />
                  <Radar
                    dataKey="required"
                    stroke="var(--color-required)"
                    fill="var(--color-required)"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ChartContainer>
              
              <div className="text-center text-sm text-gray-600">
                <p className="flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Your Level
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    Required Level
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Recommendation</h3>
            <p className="text-blue-800 mb-2">
              You're {matchScore}% suited for {targetRole}
            </p>
            <p className="text-blue-700">
              Improve these skills to increase your match: {' '}
              <span className="font-semibold">
                {userSkills.filter(s => s.status === 'weak').map(s => s.skill).join(', ')}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
