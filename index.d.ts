declare module "verifymailjs" {
  interface VerifyOptions {
    strict?: boolean;
  }

  interface VerificationResult {
    isValid: boolean;
    category: "personal" | "business" | "educational" | "disposable" | "unknown";
    reason?: string;
  }

  export function verifyEmail(email: string, options?: VerifyOptions): VerificationResult;
}
