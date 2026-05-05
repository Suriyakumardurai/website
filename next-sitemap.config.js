/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://autoplanetcorp.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api', '/_next', '/*?utm_*', '/*?ref=*', '/*?fbclid=*', '/*?gclid=*'] },
      { userAgent: 'AhrefsBot', crawlDelay: 10 },
      { userAgent: 'SemrushBot', crawlDelay: 10 },
      { userAgent: 'GPTBot', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'], disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'ClaudeBot', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: ['/llms.txt', '/llms-full.txt', '/blog/', '/services/'] },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    additionalSitemaps: [
      'https://autoplanetcorp.com/sitemap.xml',
    ],
  },
};
