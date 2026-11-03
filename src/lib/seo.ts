import { SITE_URL } from "@/lib/site";
import { faqs } from "@/lib/faqs";

export const BUSINESS = {
  legalName: "Nissi Extrusion India Pvt Ltd",
  brand: "NISSI Elite Plast",
  description:
    "Manufacturer of 100% lead-free uPVC window and door profiles with European extrusion technology, in-house galvanized steel reinforcement and a 15-year warranty. Based in Avadi, Chennai, supplying fabricators and dealers across India.",
  email: "nissiupvcprofiles@gmail.com",
  phones: ["+91-99622-25516", "+91-90421-22555", "+91-81220-13339"],
  adminOffice: {
    streetAddress: "11, K E P Garden, Varalakshmi Nagar, Main Road, Maduravoyal",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600095",
    addressCountry: "IN",
  },
  factory: {
    addressLocality: "Avadi, Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600056",
    addressCountry: "IN",
  },
};

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function buildStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS.legalName,
        alternateName: BUSINESS.brand,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        image: `${SITE_URL}/opengraph-image`,
        description: BUSINESS.description,
        email: BUSINESS.email,
        telephone: BUSINESS.phones[0],
        address: { "@type": "PostalAddress", ...BUSINESS.adminOffice },
        areaServed: { "@type": "Country", name: "India" },
        contactPoint: BUSINESS.phones.map((telephone) => ({
          "@type": "ContactPoint",
          telephone,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Tamil", "Hindi"],
        })),
        location: [
          {
            "@type": "Place",
            name: "Admin Office, Maduravoyal",
            address: { "@type": "PostalAddress", ...BUSINESS.adminOffice },
          },
          {
            "@type": "Place",
            name: "Extrusion Plant, Avadi",
            address: { "@type": "PostalAddress", ...BUSINESS.factory },
          },
        ],
        knowsAbout: [
          "uPVC window profiles",
          "uPVC door profiles",
          "Lead-free uPVC extrusion",
          "Galvanized steel reinforcement",
          "Casement and sliding window systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: BUSINESS.brand,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "NISSI Elite Plast | Leading uPVC Windows & Doors Profiles Manufacturer",
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
