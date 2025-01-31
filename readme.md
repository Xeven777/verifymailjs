# 📧 verifmailjs - Email Verifier 🚀

A lightweight and fast JavaScript library for validating and categorizing email addresses. 🛠️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features 🎯

- ✅ Validate email format and domain
- 🗂️ Categorize emails (personal, business, educational, disposable)
- 🔒 Check against blacklisted domains
- 💨 No external dependencies
- ⚡ Fast and synchronous operation

## Installation 🛠️

Install the package using npm:

```bash
npm install verifymailjs
```

Or using yarn:

```bash
yarn add verifymailjs
```

## Usage 🖥️

### Basic Usage

```javascript
import { verifyEmail } from "verifymailjs";

const result = verifyEmail("user@example.com");
console.log(result);
```

### TypeScript Usage

```typescript
import { verifyEmail, VerificationResult } from "verifymailjs";

const result: VerificationResult = verifyEmail("user@example.com");
console.log(result);
```

## API 🤖

### `verifyEmail(email: string, options?: VerifyOptions): VerificationResult`

Verifies an email address and returns a `VerificationResult` object.

#### Parameters

- `email` (string): The email address to verify.
- `options` (object, optional): Configuration options
  - `strict` (boolean): When true, only allows personal and educational email domains.

#### Returns

A `VerificationResult` object with the following properties:

- `isValid` (boolean): Indicates whether the email is valid.
- `category` (string): The category of the email. Can be one of:
  - `'personal'`
  - `'business'`
  - `'educational'`
  - `'disposable'`
  - `'unknown'`
- `reason` (string, optional): If the email is invalid, this provides a reason.

## Examples 📝

### Verifying a valid email

```javascript
import { verifyEmail } from "verifymailjs";

const result = verifyEmail("user@gmail.com");
console.log(result);
// Output: { isValid: true, category: 'personal' }
```

### Verifying an invalid email

```javascript
import { verifyEmail } from "verifymailjs";

const result = verifyEmail("invalid-email");
console.log(result);
// Output: { isValid: false, category: 'unknown', reason: 'Invalid email format' }
```

### Examples with Strict Mode

```javascript
import { verifyEmail } from "verifymailjs";

// With strict mode enabled
const result = verifyEmail("user@gmail.com", { strict: true });
console.log(result);
// Output: { isValid: true, category: 'personal' }

const result2 = verifyEmail("user@unknown-domain.com", { strict: true });
console.log(result2);
// Output: { isValid: false, category: 'unknown', reason: 'Domain not allowed in strict mode' }
```

## Limitations 🚧

This library performs basic email validation and categorization based on predefined lists and patterns. It does not perform SMTP verification or check for the actual existence of the email address. For most use cases, this level of verification is sufficient and much faster than performing network-based checks.

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 🛠️

If you encounter any problems or have any questions, please open an issue on the [GitHub repository](https://github.com/xeven777/verifymailjs).

---

Made with ❤️ by Anish Biswas
