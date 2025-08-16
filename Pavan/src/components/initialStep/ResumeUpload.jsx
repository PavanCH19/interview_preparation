import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeDropzone from './ResumeDropzone';
import { toast } from 'sonner';

const ResumeUpload = ({ onContinue }) => {
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploadedFile(file);
    setIsUploading(false);
    toast.success('Resume uploaded successfully!');
  };

  const handleContinue = () => {
    if (uploadedFile && onContinue) {
      onContinue(uploadedFile);
    }
  };

  return (
    <>
      {/* Main Content */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Upload Your Resume
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Upload your resume and let our AI analyze your skills and experience to create a personalized interview preparation plan
      </p>
      <ResumeDropzone
        onFileUpload={handleFileUpload}
        uploadedFile={uploadedFile}
        isUploading={isUploading}
      />
      {/* Continue Button with improved UX */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleContinue}
          disabled={!uploadedFile || isUploading}
          size="lg"
          className="px-8 flex items-center gap-2"
        >
          Continue to Analysis
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      {/* Help Text */}
      {uploadedFile && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Our AI will analyze your resume to extract skills, experience, and education details automatically
          </p>
        </div>
      )}
    </>
  );
};

export default ResumeUpload; 