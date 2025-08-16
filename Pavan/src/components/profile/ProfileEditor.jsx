import React, { useState, useEffect } from 'react';
import { Edit3, Save, RotateCcw, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ProfileHeader from './ProfileHeader';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
//import { ProfileData, Experience, Education } from '@/types/profile';

const ProfileEditor = ({ analyzedData, onBack, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    education: [
      {
        id: '1',
        institution: 'Stanford University',
        degree: 'Master of Science in Computer Science',
        cgpa: '3.8',
        startYear: '2020',
        endYear: '2022'
      },
      {
        id: '2',
        institution: 'UC Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        cgpa: '3.6',
        startYear: '2016',
        endYear: '2020'
      }
    ],
    experience: [
      {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        startDate: '2022-03',
        endDate: 'Present',
        description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and reduced deployment time by 60%.'
      },
      {
        id: '2',
        title: 'Software Engineer Intern',
        company: 'Startup Inc',
        startDate: '2021-06',
        endDate: '2021-08',
        description: 'Developed React components and REST APIs. Collaborated with cross-functional teams to deliver features on time.'
      }
    ]
  });

  useEffect(() => {
    // Simulate loading parsed data
    setOriginalData({ ...profileData });
  }, []);

  useEffect(() => {
    if (autoSave && isEditing) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [profileData, autoSave, isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    setOriginalData({ ...profileData });
    toast.success('Profile saved successfully!');
    if (typeof onComplete === 'function') {
      onComplete();
    }
  };

  const handleReset = () => {
    if (originalData) {
      setProfileData({ ...originalData });
      setIsEditing(false);
      toast.info('Profile reset to original data');
    }
  };

  const updateProfileData = (updates) => {
    setProfileData(prev => ({ ...prev, ...updates }));
    if (!isEditing) setIsEditing(true);
  };

  return (
    <>
      {/* Main Content */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Your Profile
            </h2>
            <p className="text-gray-600">
              Review and edit your parsed resume data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Auto-save</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoSave(!autoSave)}
              className="p-0 h-auto"
              data-testid="auto-save-toggle"
            >
              {autoSave ? (
                <ToggleRight className="h-6 w-6 text-blue-600" />
              ) : (
                <ToggleLeft className="h-6 w-6 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          className="flex items-center gap-2"
          data-testid="edit-toggle"
        >
          <Edit3 className="h-4 w-4" />
          {isEditing ? 'Editing Mode' : 'Edit Profile'}
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
          data-testid="save-profile"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          disabled={!isEditing}
          className="flex items-center gap-2"
          data-testid="reset-profile"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Original
        </Button>
      </div>
      {/* Profile Content */}
      <div className="bg-white rounded-xl shadow-sm border">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="overview" className="space-y-6">
              <ProfileHeader
                data={profileData}
                isEditing={isEditing}
                onUpdate={updateProfileData}
              />
            </TabsContent>
            <TabsContent value="skills" className="space-y-6">
              <SkillsSection
                skills={profileData.skills}
                isEditing={isEditing}
                onUpdate={(skills) => updateProfileData({ skills })}
              />
            </TabsContent>
            <TabsContent value="education" className="space-y-6">
              <EducationSection
                education={profileData.education}
                isEditing={isEditing}
                onUpdate={(education) => updateProfileData({ education })}
              />
            </TabsContent>
            <TabsContent value="experience" className="space-y-6">
              <ExperienceSection
                experience={profileData.experience}
                isEditing={isEditing}
                onUpdate={(experience) => updateProfileData({ experience })}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileEditor; 