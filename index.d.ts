// Type for the email category
type EmailCategory =
  | "personal"
  | "disposable"
  | "educational"
  | "business"
  | "unknown";

// Interface for the verification result
interface VerificationResult {
  isValid: boolean;
  category: EmailCategory;
  reason?: string;
}

// Main function declaration
declare function verifyEmail(email: string): Promise<VerificationResult>;

// Export the main function and types
export { verifyEmail, EmailCategory, VerificationResult };
