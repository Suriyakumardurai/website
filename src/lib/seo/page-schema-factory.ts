interface PageSchemaOptions {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  breadcrumbs: { name: string; url: string }[];
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage' | 'ItemPage';
}

export function generatePageSchema(options: PageSchemaOptions) {
  const pageId = `https://autoplanetcorp.com${options.path}#webpage`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Always reference the parent organization
      { '@id': 'https://autoplanetcorp.com/#organization' },
      { '@id': 'https://autoplanetcorp.com/#website' },

      // This page's specific data
      {
        '@type': options.type || 'WebPage',
        '@id': pageId,
        url: `https://autoplanetcorp.com${options.path}`,
        name: options.title,
        description: options.description,
        isPartOf: { '@id': 'https://autoplanetcorp.com/#website' },
        about: { '@id': 'https://autoplanetcorp.com/#organization' },
        datePublished: options.datePublished,
        dateModified: options.dateModified,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: options.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        },
        inLanguage: 'en-IN',
      },
    ],
  };
}
