const DOMAINS = {
  personal: new Set([
    "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
    "protonmail.com", "aol.com", "mail.com", "zoho.com", "yandex.com",
    "me.com", "msn.com", "live.com", "ymail.com", "rocketmail.com",
    "fastmail.com", "gmx.com", "hushmail.com", "inbox.com", "tutanota.com"
  ]),
  disposable: new Set([
    "tempmail.com", "throwawaymail.com", "10minutemail.com", "guerrillamail.com",
    "mailinator.com", "getairmail.com", "yopmail.com", "trashmail.com",
    "maildrop.cc", "fakeinbox.com", "mohmal.com", "mailcatch.com",
    "temp-mail.org", "sharklasers.com", "dispostable.com", "getnada.com",
    "mytemp.email", "temp-mail.io", "trashmail.net", "mintemail.com",
    "fake-mail.net"
  ]),
  educational: [".edu", ".ac.uk", ".edu.au", ".edu.in", ".edu.cn", ".edu.jp", ".edu.sg",
    ".edu.za", ".edu.mx", ".edu.br", ".edu.my", ".edu.ph", ".edu.vn", ".edu.ar",
    ".edu.pe", ".edu.tr", ".edu.co", ".edu.cl", ".edu.pk", ".edu.ng", ".edu.gh",
    ".edu.ke", ".edu.sa", ".edu.eg", ".edu.lb"],
  blacklisted: new Set([
    "spam.com", "fake.com", "invalid.com", "junkmail.com", "thisisnotarealemail.com",
    "bouncemail.com", "testmail.com", "mailtest.com", "noemail.com", "notarealemail.com",
    "dontemailme.com", "null.net", "example.com", "bogusmail.com", "emailfake.com",
    "fakemail.net", "trashmail.com", "disposablemail.com", "tempmail.com"
  ])
};

const ROLE_BASED = new Set([
  "admin", "administrator", "webmaster", "hostmaster", "postmaster", "info",
  "contact", "support", "help", "sales", "marketing", "abuse"
]);

const isValidDomain = domain => /^(?!-)[A-Za-z0-9-]+(?<!-)(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(domain);

const categorizeEmail = (localPart, domain) => {
  if (DOMAINS.personal.has(domain)) return 'personal';
  if (DOMAINS.disposable.has(domain)) return 'disposable';
  if (DOMAINS.educational.some(d => domain.endsWith(d))) return 'educational';
  if (ROLE_BASED.has(localPart)) return 'business';
  return 'unknown';
};

const verifyEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, category: 'unknown', reason: 'Invalid email format' };
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length > 64 || domain.length > 255 || !isValidDomain(domain)) {
    return { isValid: false, category: 'unknown', reason: 'Invalid local part or domain' };
  }

  if (email.includes('..') || /[()<>,;:\\"\[\]]/.test(localPart)) {
    return { isValid: false, category: 'unknown', reason: 'Invalid characters in email' };
  }

  if (DOMAINS.blacklisted.has(domain)) {
    return { isValid: false, category: 'unknown', reason: 'Blacklisted domain' };
  }

  const category = categorizeEmail(localPart, domain);

  if (category === 'disposable') {
    return { isValid: false, category, reason: 'Disposable email addresses are not allowed' };
  }

  return { isValid: true, category };
};

export { verifyEmail };