// src/utils/validation.ts
import { ValidationErrors } from '../types';

export const validateMobile = (mobile: string, t: (key: string) => string): string | undefined => {
  if (!mobile.trim()) {
    return t('Mobile number is required');
  }
  if (!/^\d{10}$/.test(mobile)) {
    return t('Mobile number must be exactly 10 digits');
  }
  return undefined;
};

export const validateAadhaar = (aadhaar: string, t: (key: string) => string): string | undefined => {
  if (!aadhaar.trim()) {
    return t('Aadhaar number is required');
  }
  if (!/^\d{12}$/.test(aadhaar)) {
    return t('Aadhaar number must be exactly 12 digits');
  }
  return undefined;
};

export const validateEmail = (email: string, t: (key: string) => string): string | undefined => {
  if (!email.trim()) {
    return t('Email is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return t('Invalid email address');
  }
  return undefined;
};

export const validateForm = (mobile: string, aadhaar: string, email: string, t: (key: string) => string): ValidationErrors => {
  return {
    mobile: validateMobile(mobile, t),
    aadhaar: validateAadhaar(aadhaar, t),
    email: validateEmail(email, t),
  };
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};