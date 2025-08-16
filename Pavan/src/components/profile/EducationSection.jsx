import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GraduationCap, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EducationSection = ({ education, isEditing, onUpdate }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      cgpa: '',
      startYear: '',
      endYear: ''
    };
    onUpdate([...education, newEducation]);
    setExpandedItems([...expandedItems, newEducation.id]);
  };

  const updateEducation = (id, updates) => {
    onUpdate(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id) => {
    onUpdate(education.filter(edu => edu.id !== id));
    setExpandedItems(expandedItems.filter(item => item !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <GraduationCap className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Education</h3>
        </div>
        {isEditing && (
          <Button
            onClick={addEducation}
            className="flex items-center gap-2"
            data-testid="add-education"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </Button>
        )}
      </div>
      {education.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No education information found. Add your educational background to strengthen your profile!
          </AlertDescription>
        </Alert>
      )}
      {education.length > 0 && (
        <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
          {education.map((edu) => (
            <AccordionItem key={edu.id} value={edu.id} data-testid={`education-item-${edu.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="text-left">
                    <div className="font-medium">
                      {edu.degree || 'Untitled Degree'} 
                      {edu.institution && ` at ${edu.institution}`}
                    </div>
                    {(edu.startYear || edu.endYear) && (
                      <div className="text-sm text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(edu.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      data-testid={`remove-education-${edu.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="e.g., Stanford University"
                      data-testid={`education-institution-${edu.id}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      data-testid={`education-degree-${edu.id}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cgpa-${edu.id}`}>CGPA/Grade</Label>
                    <Input
                      id={`cgpa-${edu.id}`}
                      value={edu.cgpa}
                      onChange={(e) => updateEducation(edu.id, { cgpa: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="e.g., 3.8/4.0"
                      data-testid={`education-cgpa-${edu.id}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`start-year-${edu.id}`}>Start Year</Label>
                      <Input
                        id={`start-year-${edu.id}`}
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="2020"
                        data-testid={`education-start-year-${edu.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-year-${edu.id}`}>End Year</Label>
                      <Input
                        id={`end-year-${edu.id}`}
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="2024"
                        data-testid={`education-end-year-${edu.id}`}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default EducationSection; 