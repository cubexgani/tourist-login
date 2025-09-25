// src/utils/validation.ts
import { ValidationErrors } from '../types';

export const validateMobile = (mobile: string): string | undefined => {
  if (!mobile.trim()) {
    return 'Mobile number is required';
  }
  if (!/^\d{10}$/.test(mobile)) {
    return 'Mobile number must be exactly 10 digits';
  }
  return undefined;
};

export const validateAadhaar = (aadhaar: string): string | undefined => {
  if (!aadhaar.trim()) {
    return 'Aadhaar number is required';
  }
  if (!/^\d{12}$/.test(aadhaar)) {
    return 'Aadhaar number must be exactly 12 digits';
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validateForm = (mobile: string, aadhaar: string, email: string): ValidationErrors => {
  return {
    mobile: validateMobile(mobile),
    aadhaar: validateAadhaar(aadhaar),
    email: validateEmail(email),
  };
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};