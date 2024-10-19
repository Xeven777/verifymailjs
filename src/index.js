import dns from 'dns';
import net from 'net';

const majorPersonalProviders = [
  "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
  "protonmail.com", "aol.com", "mail.com", "zoho.com", "yandex.com",
  "me.com", "msn.com", "live.com", "ymail.com", "rocketmail.com",
  "fastmail.com", "gmx.com", "hushmail.com", "inbox.com", "tutanota.com"
];

const disposableEmailDomains = [
  "tempmail.com", "throwawaymail.com", "10minutemail.com", "guerrillamail.com",
  "mailinator.com", "getairmail.com", "yopmail.com", "trashmail.com",
  "maildrop.cc", "fakeinbox.com", "mohmal.com", "mailcatch.com",
  "temp-mail.org", "sharklasers.com", "dispostable.com", "getnada.com",
  "mytemp.email", "temp-mail.io", "trashmail.net", "mintemail.com",
  "fake-mail.net"
];

const educationalDomains = [
  ".edu", ".ac.uk", ".edu.au", ".edu.in", ".edu.cn", ".edu.jp", ".edu.sg",
  ".edu.za", ".edu.mx", ".edu.br", ".edu.my", ".edu.ph", ".edu.vn", ".edu.ar",
  ".edu.pe", ".edu.tr", ".edu.co", ".edu.cl", ".edu.pk", ".edu.ng", ".edu.gh",
  ".edu.ke", ".edu.sa", ".edu.eg", ".edu.lb"
];

const blacklistedDomains = [
  "spam.com", "fake.com", "invalid.com", "junkmail.com", "thisisnotarealemail.com",
  "bouncemail.com", "testmail.com", "mailtest.com", "noemail.com", "notarealemail.com",
  "dontemailme.com", "null.net", "example.com", "bogusmail.com", "emailfake.com",
  "fakemail.net", "trashmail.com", "disposablemail.com", "tempmail.com"
];

const roleBasedEmails = [
  "admin", "administrator", "webmaster", "hostmaster", "postmaster", "info",
  "contact", "support", "help", "sales", "marketing", "abuse"
];

const isValidDomain = (domain) => {
  const domainRegex = /^(?!-)[A-Za-z0-9-]+(?<!-)(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  return domainRegex.test(domain);
};

const checkMxRecords = async (domain) => {
  try {
    const addresses = await dns.promises.resolveMx(domain);
    return addresses.length > 0;
  } catch {
    return false;
  }
};

const verifySmtp = async (email) => {
  const [localPart, domain] = email.split('@');
  let mxRecords;

  try {
    mxRecords = await dns.promises.resolveMx(domain);
  } catch {
    return false;
  }

  if (mxRecords.length === 0) return false;

  const mxRecord = mxRecords[0].exchange;

  return new Promise((resolve) => {
    const client = new net.Socket();

    client.connect(25, mxRecord, () => {
      client.write(`EHLO ${domain}\r\n`);
      client.write(`MAIL FROM:<${email}>\r\n`);
      client.write(`RCPT TO:<${email}>\r\n`);
      client.write(`QUIT\r\n`);
    });

    client.on('data', (data) => {
      if (data.toString().includes('250')) {
        resolve(true);
      } else {
        resolve(false);
      }
      client.destroy();
    });

    client.on('error', () => {
      resolve(false);
      client.destroy();
    });
  });
};

const categorizeEmail = async (email) => {
  const [localPart, domain] = email.split('@');

  if (majorPersonalProviders.includes(domain)) return 'personal';
  if (disposableEmailDomains.some(d => domain.endsWith(d))) return 'disposable';
  if (educationalDomains.some(d => domain.endsWith(d))) return 'educational';
  if (roleBasedEmails.includes(localPart)) return 'business';

  const hasValidMxRecords = await checkMxRecords(domain);
  return hasValidMxRecords ? 'business' : 'unknown';
};

const verifyEmail = async (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, category: 'unknown', reason: 'Invalid email format' };
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length > 64) {
    return { isValid: false, category: 'unknown', reason: 'Local part exceeds maximum length' };
  }

  if (domain.length > 255 || !isValidDomain(domain)) {
    return { isValid: false, category: 'unknown', reason: 'Invalid domain' };
  }

  if (email.includes('..')) {
    return { isValid: false, category: 'unknown', reason: 'Email contains consecutive dots' };
  }

  const invalidChars = /[()<>,;:\\"\[\]]/;
  if (invalidChars.test(localPart)) {
    return { isValid: false, category: 'unknown', reason: 'Local part contains invalid characters' };
  }

  if (blacklistedDomains.includes(domain)) {
    return { isValid: false, category: 'unknown', reason: 'Blacklisted domain' };
  }

  const category = await categorizeEmail(email);

  if (category === 'disposable') {
    return { isValid: false, category, reason: 'Disposable email addresses are not allowed' };
  }

  const smtpValid = await verifySmtp(email);
  if (!smtpValid) {
    return { isValid: false, category: 'unknown', reason: 'Email server verification failed' };
  }

  return { isValid: true, category };
};

export { verifyEmail };