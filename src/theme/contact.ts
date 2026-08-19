import { COMPANY_INFO } from '../data/company';

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export const DEFAULT_CONTACT: ContactInfo = {
  phone: COMPANY_INFO.phone,
  phoneFormatted: COMPANY_INFO.phoneFormatted,
  phoneHref: COMPANY_INFO.phoneHref,
  email: COMPANY_INFO.email,
  emailHref: COMPANY_INFO.emailHref,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parsePhone(input: string): Pick<ContactInfo, 'phone' | 'phoneFormatted' | 'phoneHref'> {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;

  if (ten.length === 10) {
    return {
      phone: `${ten.slice(0, 3)}-${ten.slice(3, 6)}-${ten.slice(6)}`,
      phoneFormatted: `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`,
      phoneHref: `tel:${ten}`,
    };
  }

  if (!trimmed) return {
    phone: DEFAULT_CONTACT.phone,
    phoneFormatted: DEFAULT_CONTACT.phoneFormatted,
    phoneHref: DEFAULT_CONTACT.phoneHref,
  };

  return {
    phone: trimmed,
    phoneFormatted: trimmed,
    phoneHref: digits ? `tel:${digits}` : DEFAULT_CONTACT.phoneHref,
  };
}

export function parseEmail(input: string): Pick<ContactInfo, 'email' | 'emailHref'> {
  const email = input.trim();
  if (!email) {
    return { email: DEFAULT_CONTACT.email, emailHref: DEFAULT_CONTACT.emailHref };
  }
  return {
    email,
    emailHref: `mailto:${email}`,
  };
}

export function isValidEmail(input: string): boolean {
  return EMAIL_RE.test(input.trim());
}

export function isValidPhone(input: string): boolean {
  const digits = input.replace(/\D/g, '');
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return ten.length === 10;
}

export function isDefaultContact(contact: ContactInfo): boolean {
  return contact.phone === DEFAULT_CONTACT.phone && contact.email === DEFAULT_CONTACT.email;
}
