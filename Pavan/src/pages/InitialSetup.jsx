import React, { useState } from 'react';
import ResumeUpload from '@/components/initialStep/ResumeUpload';
import ResumeParsingStatus from '@/components/initialStep/ResumeParsingStatus';
import ProfileEditor from '@/components/profile/ProfileEditor';
import DomainSelection from '@/components/initialStep/DomainSelection';
import Assessment from '@/components/initialStep/Assessment';
import CarrerMatch from '@/components/initialStep/CarrerMatch';
import CareerMapping from '@/components/initialStep/CareerMapping';
import { CareerCTA } from '@/components/career/CareerCTA';

const steps = [
  { name: 'Resume Setup' },
  { name: 'Domain Selection' },
  { name: 'Assessment' },
  { name: 'Career Match' },
];

// Step 1: Resume Setup with sub-steps
const ResumeSetupStep = ({ onComplete }) => {
  const [subStep, setSubStep] = useState(1); // 1: Upload, 2: Parsing, 3: Edit
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzedData, setAnalyzedData] = useState(null);

  // Handlers to move between sub-steps
  const handleUploadSuccess = (file) => {
    setUploadedFile(file);
    setSubStep(2);
  };
  const handleParsingSuccess = (data) => {
    setAnalyzedData(data);
    setSubStep(3);
  };
  const handleBackToUpload = () => {
    setSubStep(1);
    setUploadedFile(null);
  };
  const handleBackToParsing = () => {
    setSubStep(2);
  };

  // Render sub-step
  if (subStep === 1) {
    return <ResumeUpload onContinue={handleUploadSuccess} />;
  }
  if (subStep === 2) {
    return <ResumeParsingStatus uploadedFile={uploadedFile} onSuccess={handleParsingSuccess} onBack={handleBackToUpload} />;
  }
  if (subStep === 3) {
    return <ProfileEditor analyzedData={analyzedData} onBack={handleBackToParsing} onComplete={onComplete} />;
  }
  return null;
};

const InitialSetup = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1-based index
  const totalSteps = steps.length;

  // Calculate progress percentage
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ResumeSetupStep onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <DomainSelection onContinue={() => setCurrentStep(3)} />;
      case 3:
        return <Assessment onContinue={() => setCurrentStep(4)} />;
      case 4:
        return <CareerMapping />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100">
      {/* Header row: project name left, step indicator right */}
      <div className="pt-10 mb-4 w-full max-w-4xl">
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-2xl font-bold text-blue-700">InterviewAce</span>
          <span className="text-base font-semibold text-indigo-500 bg-indigo-50 px-4 py-1 rounded-full">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].name}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full">
          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Card only for step 1 */}
      {currentStep === 1 ? (
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl min-w-[600px] w-[900px] text-center relative">
          {renderStepContent()}
        </div>
      ) : (
        <div className="w-full flex justify-center">{renderStepContent()}</div>
      )}
    </div>
  );
};

export default InitialSetup; 