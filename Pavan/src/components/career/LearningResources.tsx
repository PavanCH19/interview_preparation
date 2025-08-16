
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, Play, Clock, DollarSign, ChevronDown, ChevronRight, Plus } from 'lucide-react';

interface Resource {
  title: string;
  platform: string;
  duration: string;
  cost: string;
  type: string;
  description: string;
}

interface LearningResourceGroup {
  skill: string;
  resources: Resource[];
}

interface LearningResourcesProps {
  resources: LearningResourceGroup[];
}

export const LearningResources = ({ resources }: LearningResourcesProps) => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (skill: string) => {
    setOpenSections(prev => ({
      ...prev,
      [skill]: !prev[skill]
    }));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Play className="h-4 w-4 text-red-600" />;
      case 'udemy':
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      case 'coursera':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'course':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCostColor = (cost: string) => {
    return cost.toLowerCase().includes('free') ? 'text-green-600' : 'text-orange-600';
  };

  return (
    <div className="mb-8">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            Curated Learning Resources
          </CardTitle>
          <p className="text-gray-600">
            Personalized resources to bridge your skill gaps
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {resources.map((group, groupIndex) => (
              <Collapsible 
                key={groupIndex}
                open={openSections[group.skill]}
                onOpenChange={() => toggleSection(group.skill)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Improve your {group.skill} Knowledge
                            </h3>
                            <p className="text-sm text-gray-600">
                              {group.resources.length} resources available
                            </p>
                          </div>
                        </div>
                        {openSections[group.skill] ? 
                          <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        }
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-4">
                  <div className="space-y-4 pl-4">
                    {group.resources.map((resource, resourceIndex) => (
                      <Card key={resourceIndex} className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getPlatformIcon(resource.platform)}
                                <h4 className="font-medium text-gray-900">
                                  {resource.title}
                                </h4>
                                <Badge className={getTypeColor(resource.type)}>
                                  {resource.type}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-3">
                                {resource.description}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{resource.duration}</span>
                                </div>
                                <div className={`flex items-center gap-1 ${getCostColor(resource.cost)}`}>
                                  <DollarSign className="h-4 w-4" />
                                  <span className="font-medium">{resource.cost}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {resource.platform}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button size="sm" className="whitespace-nowrap">
                                <Plus className="h-4 w-4 mr-1" />
                                Add to Plan
                              </Button>
                              <Button size="sm" variant="outline" className="whitespace-nowrap">
                                <Play className="h-4 w-4 mr-1" />
                                Start Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
