import React, { useEffect } from 'react';
import { withBase } from '../lib/basePath';
import { useCompany } from './ThemeContext';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SeoHead: React.FC<SeoProps> = ({
  title = 'Coliseum Concrete & Interlock | Ottawa Concrete & Hardscape Craftsmen',
  description = 'Ottawa\'s licensed concrete and interlock contractor. Stamped concrete patios, concrete driveways, interlock walkways, and architectural hardscapes.',
  canonicalPath = '/',
  schema
}) => {
  const COMPANY_INFO = useCompany();
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + withBase(canonicalPath));

    // Schema JSON-LD injection
    const defaultLocalBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.province,
        postalCode: COMPANY_INFO.address.postalCode,
        addressCountry: 'CA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY_INFO.geo.latitude,
        longitude: COMPANY_INFO.geo.longitude
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Ottawa' },
        { '@type': 'AdministrativeArea', name: 'Kanata' },
        { '@type': 'AdministrativeArea', name: 'Nepean' },
        { '@type': 'AdministrativeArea', name: 'Barrhaven' },
        { '@type': 'AdministrativeArea', name: 'Orleans' },
        { '@type': 'AdministrativeArea', name: 'Stittsville' }
      ],
      description: 'Licensed residential concrete, stamped concrete, and interlock stone contractor serving Ottawa and surrounding areas.',
      priceRange: '$$$',
      ...(COMPANY_INFO.openingHours ? { openingHours: COMPANY_INFO.openingHours } : {}),
    };

    const schemaToInject = schema || defaultLocalBusinessSchema;
    
    // Remove previous dynamic schema
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaToInject);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('json-ld-schema');
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, schema, COMPANY_INFO.phone, COMPANY_INFO.email, COMPANY_INFO.openingHours]);

  return null;
};
