export interface UserData {
  mobile: string;
  aadhaar: string;
  email: string;
}

export interface ValidationErrors {
  mobile?: string;
  aadhaar?: string;
  email?: string;
}

export interface ValidationErrorKeys {
  mobile?: string;
  aadhaar?: string;
  email?: string;
}

export type RootStackParamList = {
  Login: undefined;
  QRCode: { userData: UserData };
};