import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Code, Plus, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const skillSuggestions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
  'HTML', 'CSS', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes',
  'Git', 'REST APIs', 'GraphQL', 'Redux', 'Vue.js', 'Angular',
  'Express.js', 'Django', 'Flask', 'Spring Boot', 'PostgreSQL'
];

const SkillsSection = ({ skills, isEditing, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (value) => {
    setNewSkill(value);
    if (value.length > 0) {
      const filtered = skillSuggestions.filter(
        skill => 
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(skill)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      onUpdate([...skills, skill.trim()]);
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Code className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Skills & Technologies</h3>
      </div>

      {skills.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No skills found in your resume. Add some skills to showcase your expertise!
          </AlertDescription>
        </Alert>
      )}

      {/* Skills Display */}
      <div className="space-y-4">
        <Label>Your Skills</Label>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-lg bg-gray-50">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1"
              data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {skill}
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                  onClick={() => removeSkill(skill)}
                  data-testid={`remove-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}
          {skills.length === 0 && (
            <span className="text-gray-500 italic">No skills added yet</span>
          )}
        </div>
      </div>

      {/* Add New Skill */}
      {isEditing && (
        <div className="space-y-2 relative">
          <Label htmlFor="new-skill">Add New Skill</Label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                id="new-skill"
                value={newSkill}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a skill (e.g., JavaScript)"
                data-testid="new-skill-input"
              />
              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => addSkill(suggestion)}
                      data-testid={`skill-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={() => addSkill(newSkill)}
              disabled={!newSkill.trim()}
              className="flex items-center gap-1"
              data-testid="add-skill-button"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection; 