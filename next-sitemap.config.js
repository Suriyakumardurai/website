/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://autoplanetcorp.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*', '/icon.png', '/manifest.webmanifest'],
  additionalPaths: async () => {
    return [
      { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
      { loc: '/about', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/services', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
      { loc: '/pricing', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
      { loc: '/faq', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { loc: '/contact', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/blog', changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/tools/llm-cost-calculator', changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() },
      { loc: '/case-studies', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/process', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/services/ai-solutions', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/services/web-development', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { loc: '/services/mobile-apps', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { loc: '/services/ui-ux-design', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { loc: '/services/cloud-devops', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { loc: '/services/performance', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
    ];
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // Block API and tracking query params only — do NOT block /_next (causes font/asset blocking in GSC)
      { userAgent: '*', disallow: ['/api', '/*?utm_*', '/*?ref=*', '/*?fbclid=*', '/*?gclid=*'] },
      { userAgent: 'AhrefsBot', crawlDelay: 10 },
      { userAgent: 'SemrushBot', crawlDelay: 10 },
      { userAgent: 'GPTBot', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'], disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'ClaudeBot', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    // No additionalSitemaps — next-sitemap already handles sitemap-0.xml linking correctly
  },
};
