import { UserData } from "../types";
import { Buffer } from "buffer";

const KEY = "TouristApp2025";

export const generateId = (mobile: string, aadhaar: string, email: string): string => {
  const data: UserData = {
    mobile,
    aadhaar,
    email,
  };
  
  const jsonString = JSON.stringify(data);
  let encoded = '';
  for (let i = 0; i < jsonString.length; i++) {
    const keyChar = KEY[i % KEY.length];
    encoded += String.fromCharCode(jsonString.charCodeAt(i) ^ keyChar.charCodeAt(0));
  }
  
  return Buffer.from(encoded, 'binary').toString('base64');
};

export const decryptId = (encodedId: string): UserData | null => {
  try {
    // Convert from base64
    const encoded = Buffer.from(encodedId, 'base64').toString('binary');
    
    // Decode XOR encoding
    let decoded = '';
    for(let i = 0; i < encoded.length; i++) {
      const keyChar = KEY[i % KEY.length];
      decoded += String.fromCharCode(encoded.charCodeAt(i) ^ keyChar.charCodeAt(0));
    }
    
    // Parse JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to decode ID:', error);
    return null;
  }
};