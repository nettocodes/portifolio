import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

export default function SEO({
  title = 'Ivo Netto | Full-Stack Developer',
  description = 'Desenvolvedor Full-Stack especializado em React, Next.js, Node.js e tecnologias modernas. Criando soluções digitais inovadoras e de alta performance.',
  url = 'https://ivonetto.vercel.app',
  image = 'https://ivonetto.vercel.app/images/og-image.webp',
  type = 'website'
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="language" content="pt-BR" />
      <meta name="author" content="Ivo Netto" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ivo Netto - Portfolio" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@ivo.braatz" />
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/logo-white.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-dark.svg" />
      
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="msapplication-TileColor" content="#0a0a0a" />
      
      {/* Additional SEO */}
      <meta name="keywords" content="desenvolvedor, full-stack, react, nextjs, nodejs, typescript, javascript, portfolio, ivo netto, web developer, frontend, backend" />
      <meta name="geo.region" content="BR-SC" />
      <meta name="geo.placename" content="Santa Catarina, Brasil" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ivo Netto",
            "jobTitle": "Full-Stack Developer",
            "description": description,
            "url": url,
            "image": image,
            "sameAs": [
              "https://www.linkedin.com/in/ivobraatz/",
              "https://github.com/nettocodes",
              "https://www.threads.com/@netto.codes"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santa Catarina",
              "addressCountry": "BR"
            },
            "alumniOf": "Tecnologia da Informação",
            "knowsAbout": [
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "JavaScript",
              "Python",
              "Full-Stack Development",
              "Web Development"
            ]
          })
        }}
      />
    </Head>
  );
}
