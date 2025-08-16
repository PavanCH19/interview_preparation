import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Briefcase, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ExperienceSection = ({ experience, isEditing, onUpdate }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onUpdate([...experience, newExperience]);
    setExpandedItems([...expandedItems, newExperience.id]);
  };

  const updateExperience = (id, updates) => {
    onUpdate(experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExperience = (id) => {
    onUpdate(experience.filter(exp => exp.id !== id));
    setExpandedItems(expandedItems.filter(item => item !== id));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Briefcase className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
        </div>
        {isEditing && (
          <Button
            onClick={addExperience}
            className="flex items-center gap-2"
            data-testid="add-experience"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        )}
      </div>
      {experience.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No work experience found. Add your professional experience to showcase your career journey!
          </AlertDescription>
        </Alert>
      )}
      {experience.length > 0 && (
        <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
          {experience.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id} data-testid={`experience-item-${exp.id}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="text-left">
                    <div className="font-medium">
                      {exp.title || 'Untitled Position'}
                      {exp.company && ` at ${exp.company}`}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      data-testid={`remove-experience-${exp.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                      <Input
                        id={`title-${exp.id}`}
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="e.g., Senior Software Engineer"
                        data-testid={`experience-title-${exp.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="e.g., Tech Corp"
                        data-testid={`experience-company-${exp.id}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`start-date-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        data-testid={`experience-start-date-${exp.id}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                      <Input
                        id={`end-date-${exp.id}`}
                        type="month"
                        value={exp.endDate === 'Present' ? '' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { 
                          endDate: e.target.value || 'Present' 
                        })}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                        placeholder="Leave empty for current role"
                        data-testid={`experience-end-date-${exp.id}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      rows={4}
                      data-testid={`experience-description-${exp.id}`}
                    />
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

export default ExperienceSection; 