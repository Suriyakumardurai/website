export function generateKnowledgePanelSeed() {
  const orgEntity = {
    '@type': 'Organization',
    '@id': 'https://autoplanetcorp.com/#organization',
    name: 'AutoPlanet Corporation',
    alternateName: ['AutoPlanet', 'AutoPlanet Corp', 'AutoPlanetCorp'],
    url: 'https://autoplanetcorp.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://autoplanetcorp.com/#logo',
      url: 'https://autoplanetcorp.com/favicon.svg',
      contentUrl: 'https://autoplanetcorp.com/favicon.svg',
      width: 512,
      height: 512,
      caption: 'AutoPlanet Corporation Logo',
    },
    image: { '@id': 'https://autoplanetcorp.com/#logo' },
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Suriya',
      jobTitle: 'Founder & CEO',
      sameAs: [
        'https://www.linkedin.com/in/suriya-autoplanet',
      ],
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 50,
    },
    slogan: 'AI-Powered Automation for Enterprise',
    knowsAbout: [
      'Artificial Intelligence',
      'Large Language Models',
      'Machine Learning',
      'SaaS Development',
      'Workflow Automation',
      'Natural Language Processing',
    ],
    sameAs: [
      'https://www.linkedin.com/company/autoplanet-corporation',
      'https://x.com/ceoofautoplanet',
      'https://www.instagram.com/autoplanet.corp',
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      orgEntity,
      {
        '@type': 'WebSite',
        '@id': 'https://autoplanetcorp.com/#website',
        url: 'https://autoplanetcorp.com',
        name: 'AutoPlanet Corporation',
        publisher: { '@id': 'https://autoplanetcorp.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://autoplanetcorp.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://autoplanetcorp.com/#webpage',
        url: 'https://autoplanetcorp.com',
        name: 'AutoPlanet Corporation | AI-Powered Automation',
        isPartOf: { '@id': 'https://autoplanetcorp.com/#website' },
        about: { '@id': 'https://autoplanetcorp.com/#organization' },
        datePublished: '2024-01-01T00:00:00+05:30',
        dateModified: new Date().toISOString(),
        description: 'Enterprise AI automation, custom LLM development, and SaaS solutions.',
        breadcrumb: { '@id': 'https://autoplanetcorp.com/#breadcrumb' },
        inLanguage: 'en-IN',
        primaryImageOfPage: { '@id': 'https://autoplanetcorp.com/#logo' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://autoplanetcorp.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://autoplanetcorp.com',
          },
        ],
      },
    ],
  };
}
