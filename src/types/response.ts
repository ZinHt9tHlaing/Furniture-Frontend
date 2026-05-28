export interface LoginResponses {
  message: string;
  userId: string;
}

export interface RegisterResponse {
  message: string;
  phone: string;
  token: string;
}

export interface VerifyOtpResponse {
  message: string;
  phone: string;
  token: string;
}

export interface ConfirmPasswordResponses {
  message: string;
  userId: string;
}
