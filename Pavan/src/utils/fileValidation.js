// src/utils/fileValidation.js

/**
 * @typedef {Object} FileValidationResult
 * @property {boolean} isValid
 * @property {string=} error
 */

/**
 * Validate a resume file for upload (PDF or DOCX, <5MB, not empty)
 * @param {File} file
 * @returns {FileValidationResult}
 */
export const validateResumeFile = (file) => {
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 5MB'
    };
  }

  // Check file type
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const allowedExtensions = ['.pdf', '.docx'];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: 'Please upload a PDF or DOCX file'
    };
  }

  // Check if file is empty
  if (file.size === 0) {
    return {
      isValid: false,
      error: 'File appears to be empty'
    };
  }

  return {
    isValid: true
  };
}; 