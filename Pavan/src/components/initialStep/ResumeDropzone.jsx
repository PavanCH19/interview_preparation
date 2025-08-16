import React, { useRef, useState } from 'react';
import { FileText, Upload, File, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateResumeFile } from '@/utils/fileValidation';

const ResumeDropzone = ({ onFileUpload, uploadedFile, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    const validation = validateResumeFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }
    setError(null);
    onFileUpload(file);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension === 'pdf' ? '📄' : '📝';
  };

  return (
    <div className="w-full">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploadedFile ? 'border-green-500 bg-green-50' : ''}
          ${isUploading ? 'border-yellow-500 bg-yellow-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />
        {/* Upload State */}
        {!uploadedFile && !isUploading && (
          <>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Your Resume
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF and DOCX files up to 5MB
            </p>
            <Button onClick={handleBrowseClick} className="mx-auto">
              <File className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </>
        )}
        {/* Uploading State */}
        {isUploading && (
          <>
            <div className="flex justify-center mb-4">
              <div className="animate-spin">
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Uploading...
            </h3>
            <p className="text-gray-600">
              Please wait while we upload your resume
            </p>
          </>
        )}
        {/* Success State */}
        {uploadedFile && !isUploading && (
          <>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Resume Uploaded Successfully!
            </h3>
            <div className="bg-white rounded-lg p-4 mx-auto max-w-sm border">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getFileIcon(uploadedFile.name)}
                </span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleBrowseClick}
              variant="outline"
              className="mt-4"
            >
              Upload Different File
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeDropzone; 