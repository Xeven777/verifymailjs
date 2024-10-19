declare module "verifymailjs" {
  interface VerificationResult {
    isValid: boolean;
    category:
      | "personal"
      | "business"
      | "educational"
      | "disposable"
      | "unknown";
    reason?: string;
  }

  export function verifyEmail(email: string): VerificationResult;
}
