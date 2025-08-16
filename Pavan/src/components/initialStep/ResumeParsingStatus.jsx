import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const ResumeParsingStatus = ({ uploadedFile, onSuccess, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('parsing');
  const [currentStep, setCurrentStep] = useState('Uploading resume...');

  const steps = [
    'Uploading resume...',
    'Extracting text content...',
    'Analyzing skills and experience...',
    'Identifying education details...',
    'Generating profile insights...',
    'Finalizing analysis...'
  ];

  useEffect(() => {
    // If no file data, go back
    if (!uploadedFile) {
      toast.error('No resume file found. Please upload a resume first.');
      if (onBack) onBack();
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setStatus('success');
          setCurrentStep('Analysis complete!');
          setTimeout(() => {
            if (onSuccess) {
              onSuccess({
                fileName: uploadedFile.name,
                analysisComplete: true,
                // Mock analyzed data
                skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                experience: '3+ years',
                education: 'Computer Science Degree'
              });
            }
            toast.success('Resume analysis completed successfully!');
          }, 2000);
          return 100;
        }
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(steps[Math.min(stepIndex, steps.length - 1)]);
        return newProgress;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [uploadedFile, onSuccess, onBack]);

  const handleRetry = () => {
    setProgress(0);
    setStatus('parsing');
    setCurrentStep('Uploading resume...');
  };

  return (
    <>
      {/* Main Content */}
      {/* File Info */}
      {uploadedFile && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Analyzing:</p>
          <p className="font-medium text-gray-900 truncate">{uploadedFile.name}</p>
        </div>
      )}
      {/* Status Icon */}
      <div className="mb-6">
        {status === 'parsing' && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
          </div>
        )}
        {status === 'success' && (
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        )}
        {status === 'error' && (
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-red-600" />
          </div>
        )}
      </div>
      {/* Status Text */}
      <div className="mb-6">
        {status === 'parsing' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analyzing Your Resume
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI is extracting skills, experience, and education from your resume
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              Analysis Complete!
            </h2>
            <p className="text-green-600 mb-4">
              Your resume has been successfully analyzed. Redirecting to profile editor...
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Parsing Failed
            </h2>
            <p className="text-red-600 mb-4">
              We couldn't analyze your resume. Please try again.
            </p>
          </>
        )}
      </div>
      {/* Parsing Progress Bar */}
      {status === 'parsing' && (
        <div className="mb-6">
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-500">{currentStep}</p>
        </div>
      )}
      {/* Estimated Time */}
      {status === 'parsing' && (
        <div className="mb-6 text-sm text-gray-500">
          <span className="animate-pulse">Estimated time: 30-60 seconds</span>
        </div>
      )}
      {/* Action Buttons */}
      {status === 'error' && (
        <div className="flex gap-2">
          <Button
            onClick={handleRetry}
            className="flex items-center gap-2 flex-1"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Analysis
          </Button>
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}
      {status === 'parsing' && (
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel & Go Back
        </Button>
      )}
    </>
  );
};

export default ResumeParsingStatus; 