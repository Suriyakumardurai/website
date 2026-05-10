export interface ServiceData {
  id: string;
  name: string;
  description: string;
  features: string[];
  longDescription: string;
}

export const services: ServiceData[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Custom websites and web applications',
    features: ['Next.js & React', 'Full-Stack Solutions', 'API Development'],
    longDescription: 'Custom websites and web applications built with cutting-edge technologies for blazing-fast performance and seamless user experiences.'
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    description: 'Mobile applications',
    features: ['React Native', 'iOS & Android', 'App Store Ready'],
    longDescription: 'Native and cross-platform mobile applications that deliver seamless user experiences across all devices and platforms.'
  },
  {
    id: 'ai-solutions',
    name: 'AI Solutions',
    description: 'Intelligent automation and AI-powered tools',
    features: ['Machine Learning', 'Chatbots & LLMs', 'Data Analytics'],
    longDescription: 'Intelligent automation and AI-powered tools that give your business a competitive edge in the rapidly evolving market.'
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    description: 'Cloud infrastructure and CI/CD pipelines',
    features: ['AWS & Azure', 'Docker & K8s', 'CI/CD Pipelines'],
    longDescription: 'Scalable cloud infrastructure and CI/CD pipelines for seamless deployment, real-time monitoring, and operations.'
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'Human-centered design',
    features: ['Design Systems', 'Prototyping', 'User Research'],
    longDescription: 'Human-centered design that transforms complex ideas into intuitive, beautiful interfaces that users love to interact with.'
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Optimization and scaling solutions',
    features: ['Speed Optimization', 'SEO & Core Vitals', 'Load Testing'],
    longDescription: 'Optimization and scaling solutions to ensure your digital products run at peak performance at all times.'
  }
];