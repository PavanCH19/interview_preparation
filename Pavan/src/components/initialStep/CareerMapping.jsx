import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';
import { CareerFitReport } from '@/components/career/CareerFitReport';
import { AlternativeRoles } from '@/components/career/AlternativeRoles';
import { LearningResources } from '@/components/career/LearningResources';
import { CareerCTA } from '@/components/career/CareerCTA';

const CareerMapping = () => {
  const navigate = useNavigate();

  // Mock data - in real app would come from API
  const mockData = {
    targetRole: "Backend Developer",
    matchScore: 77,
    userSkills: [
      { skill: "JavaScript", userLevel: 85, requiredLevel: 90, status: "strong" },
      { skill: "Node.js", userLevel: 70, requiredLevel: 85, status: "moderate" },
      { skill: "Docker", userLevel: 30, requiredLevel: 80, status: "weak" },
      { skill: "API Design", userLevel: 40, requiredLevel: 85, status: "weak" },
      { skill: "Database", userLevel: 75, requiredLevel: 70, status: "strong" },
      { skill: "System Design", userLevel: 60, requiredLevel: 75, status: "moderate" }
    ],
    alternativeRoles: [
      {
        id: 1,
        title: "DevOps Engineer",
        matchScore: 82,
        upskillEffort: "Medium",
        requiredSkills: ["Docker", "AWS", "CI/CD", "Monitoring"],
        description: "Strong infrastructure focus matches your current skills"
      },
      {
        id: 2,
        title: "Full Stack Developer",
        matchScore: 89,
        upskillEffort: "Low",
        requiredSkills: ["React", "Node.js", "CSS", "MongoDB"],
        description: "Your JavaScript skills are perfectly suited for this role"
      },
      {
        id: 3,
        title: "Data Engineer",
        matchScore: 71,
        upskillEffort: "High",
        requiredSkills: ["Python", "SQL", "Spark", "Kafka"],
        description: "Database skills transfer well, but requires new tech stack"
      }
    ],
    learningResources: [
      {
        skill: "Docker",
        resources: [
          {
            title: "Docker Mastery: Complete Toolset",
            platform: "Udemy",
            duration: "19 hours",
            cost: "$89.99",
            type: "Course",
            description: "Complete Docker container technology course"
          },
          {
            title: "Docker Tutorial for Beginners",
            platform: "YouTube",
            duration: "3 hours",
            cost: "Free",
            type: "Video",
            description: "Comprehensive Docker basics tutorial"
          }
        ]
      },
      {
        skill: "API Design",
        resources: [
          {
            title: "REST API Design Best Practices",
            platform: "Coursera",
            duration: "6 weeks",
            cost: "$49/month",
            type: "Course",
            description: "Learn professional API design patterns"
          },
          {
            title: "Building RESTful APIs",
            platform: "YouTube",
            duration: "2 hours",
            cost: "Free",
            type: "Video",
            description: "Practical API development tutorial"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <div className="pt-4 px-4 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/assessment-results')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Career Path Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Discover how well you match your target role and explore better-fit alternatives
          </p>
        </div>

        {/* Career Fit Report */}
        <CareerFitReport
          targetRole={mockData.targetRole}
          matchScore={mockData.matchScore}
          userSkills={mockData.userSkills}
        />

        {/* Alternative Roles */}
        <AlternativeRoles roles={mockData.alternativeRoles} />

        {/* Learning Resources */}
        <LearningResources resources={mockData.learningResources} />

        {/* CTA Section */}
        <CareerCTA />
      </div>
    </div>
  );
};

export default CareerMapping; 