import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO = ({
  title = 'RootNexis — Transform Ideas Into Digital Reality | Web Development & AI Solutions in Kigali, Rwanda',
  description = 'RootNexis is a leading digital agency in Kigali, Rwanda specializing in web development, UI/UX design, AI automation, and branding. Transform your vision into high-performance digital products.',
  keywords = 'web development Kigali Rwanda, UI UX design Rwanda, AI automation Africa, digital agency Rwanda, React development, Next.js apps, branding services, mobile app development, SEO optimization, chatbot development, RootNexis, Rwanda tech company',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  structuredData
}: SEOProps) => {
  const location = useLocation();
  const fullUrl = `${url}${location.pathname}`;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RootNexis",
    "logo": "/logoRN.png",
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kigali",
      "addressCountry": "Rwanda"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+250725064686",
      "contactType": "customer service",
      "email": "rootnexis@gmail.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://wa.me/+250725064686"
    ],
    "services": [
      "Web Development",
      "UI/UX Design",
      "AI Automation",
      "Digital Strategy",
      "Branding",
      "Mobile App Development",
      "SEO Optimization"
    ],
    "areaServed": "Rwanda",
    "foundingDate": "2024"
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="RootNexis" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="RW-KI" />
      <meta name="geo.placename" content="Kigali, Rwanda" />
      <meta name="geo.position" content="-1.9441;30.0619" />
      <meta name="ICBM" content="-1.9441, 30.0619" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="RootNexis" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@RootNexis" />
      <meta property="twitter:creator" content="@RootNexis" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
