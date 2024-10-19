# ✉️ verifymailjs - Email Verifier

A robust and modern JavaScript library for validating and categorizing email addresses.

## ✨ Features

- ✅ Validate email format and domain
- 📊 Categorize emails (personal, business, educational, disposable)
- 📬 Check for MX records
- 🔗 Verify SMTP connection
- 🛠️ TypeScript support
- 🚀 Modern JavaScript (ES6+) syntax

## 📦 Installation

Install the package using npm:

```bash
npm install email-verifier
```

Or using yarn:

```bash
yarn add email-verifier
```

## Usage

### Basic Usage

```javascript
import { verifyEmail } from "email-verifier";

async function checkEmail(email) {
  try {
    const result = await verifyEmail(email);
    console.log(result);
  } catch (error) {
    console.error("Error verifying email:", error);
  }
}

checkEmail("user@example.com");
```

### TypeScript Usage

```typescript
import { verifyEmail, VerificationResult } from "email-verifier";

async function checkEmail(email: string): Promise<void> {
  try {
    const result: VerificationResult = await verifyEmail(email);
    console.log(result);
  } catch (error) {
    console.error("Error verifying email:", error);
  }
}

checkEmail("user@example.com");
```

## API

### `verifyEmail(email: string): Promise<VerificationResult>`

Verifies an email address and returns a promise that resolves to a `VerificationResult` object.

#### Parameters

- `email` (string): The email address to verify.

#### Returns

A Promise that resolves to a `VerificationResult` object with the following properties:

- `isValid` (boolean): Indicates whether the email is valid.
- `category` (string): The category of the email. Can be one of:
  - `'personal'`
  - `'business'`
  - `'educational'`
  - `'disposable'`
  - `'unknown'`
- `reason` (string, optional): If the email is invalid, this provides a reason.

## Examples

### Verifying a valid email

```javascript
import { verifyEmail } from "email-verifier";

const result = await verifyEmail("user@gmail.com");
console.log(result);
// Output: { isValid: true, category: 'personal' }
```

### Verifying an invalid email

```javascript
import { verifyEmail } from "email-verifier";

const result = await verifyEmail("invalid-email");
console.log(result);
// Output: { isValid: false, category: 'unknown', reason: 'Invalid email format' }
```

## Error Handling

The `verifyEmail` function throws errors for network issues or other unexpected problems. Always use try-catch blocks or `.catch()` when using this function.

```javascript
import { verifyEmail } from "email-verifier";

try {
  const result = await verifyEmail("user@example.com");
  console.log(result);
} catch (error) {
  console.error("Error verifying email:", error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Support

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/xeven777).

---

Made with ❤️ by [Anish](https://bento.me/anish7)
