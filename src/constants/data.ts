import { Skill, Project, Experience, SocialLink } from '@/types'

export const PERSONAL_INFO = {
  name: 'Ivo Braatz',
  title: 'Software Developer',
  email: 'ivo.braatz@email.com',
  location: 'Brasil',
  bio: 'Desenvolvedor de software especializado em criar soluções elegantes e escaláveis. Apaixonado por arquitetura limpa, performance e experiência do usuário.'
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ivobraatz',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ivobraatz',
    icon: 'linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:ivo.braatz@email.com',
    icon: 'email'
  }
]

export const SKILLS: Skill[] = [
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 92, category: 'frontend' },
  { name: 'React', level: 94, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'Vue.js', level: 85, category: 'frontend' },
  { name: 'Node.js', level: 88, category: 'backend' },
  { name: 'Python', level: 82, category: 'backend' },
  { name: 'Go', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 85, category: 'database' },
  { name: 'MongoDB', level: 80, category: 'database' },
  { name: 'Redis', level: 78, category: 'database' },
  { name: 'Docker', level: 88, category: 'devops' },
  { name: 'Kubernetes', level: 75, category: 'devops' },
  { name: 'AWS', level: 82, category: 'cloud' },
  { name: 'Git', level: 92, category: 'tools' },
  { name: 'Linux', level: 85, category: 'tools' }
]

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Enterprise SaaS Platform',
    slug: 'enterprise-saas-platform',
    description: 'Plataforma SaaS completa com multi-tenancy, autenticação avançada e dashboards analíticos em tempo real.',
    longDescription: 'Uma plataforma SaaS enterprise robusta construída para escalar. O sistema implementa multi-tenancy completo, permitindo que múltiplas organizações utilizem a mesma infraestrutura com isolamento total de dados. Inclui sistema de autenticação avançado com SSO, 2FA e gestão granular de permissões. Os dashboards analíticos processam milhões de eventos em tempo real utilizando Redis Streams e apresentam insights através de visualizações interativas.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    link: 'https://demo.example.com',
    github: 'https://github.com/ivobraatz/saas-platform',
    image: '/projects/saas-platform.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
    highlights: [
      'Multi-tenancy com isolamento completo de dados',
      'Sistema de autenticação com SSO e 2FA',
      'Dashboards analíticos em tempo real',
      'API RESTful documentada com Swagger',
      'Pipeline CI/CD automatizado'
    ],
    challenges: [
      {
        title: 'Escalabilidade',
        description: 'Necessidade de suportar milhares de tenants simultâneos',
        solution: 'Implementação de cache distribuído com Redis e otimização de queries com indexes compostos'
      },
      {
        title: 'Isolamento de Dados',
        description: 'Garantir segurança e privacidade entre diferentes organizações',
        solution: 'Row-level security no PostgreSQL e validação em múltiplas camadas da aplicação'
      }
    ]
  },
  {
    id: 2,
    title: 'Real-time Collaboration Tool',
    slug: 'realtime-collaboration-tool',
    description: 'Ferramenta de colaboração em tempo real com WebSocket, edição simultânea e sincronização de estado.',
    longDescription: 'Aplicação de colaboração em tempo real inspirada em ferramentas como Figma e Google Docs. Permite que múltiplos usuários editem documentos simultaneamente com sincronização instantânea de mudanças. Utiliza operational transformation para resolver conflitos de edição e WebSocket para comunicação bidirecional de baixa latência.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: 'https://collab-demo.example.com',
    github: 'https://github.com/ivobraatz/realtime-collab',
    image: '/projects/collab-tool.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: true,
    highlights: [
      'Edição colaborativa em tempo real',
      'Presence awareness (cursores de usuários)',
      'Histórico completo com undo/redo',
      'Sincronização offline-first',
      'WebSocket com fallback para polling'
    ],
    challenges: [
      {
        title: 'Conflitos de Edição',
        description: 'Múltiplos usuários editando o mesmo conteúdo simultaneamente',
        solution: 'Implementação de Operational Transformation (OT) para resolução automática de conflitos'
      }
    ]
  },
  {
    id: 3,
    title: 'Microservices Architecture',
    slug: 'microservices-architecture',
    description: 'Arquitetura de microserviços escalável com API Gateway, service mesh e observabilidade completa.',
    longDescription: 'Sistema distribuído baseado em microserviços implementando patterns modernos de arquitetura cloud-native. Utiliza API Gateway para roteamento inteligente, service mesh para comunicação segura entre serviços, e stack completa de observabilidade com logs centralizados, métricas e distributed tracing.',
    technologies: ['Go', 'Kubernetes', 'gRPC', 'Prometheus'],
    github: 'https://github.com/ivobraatz/microservices',
    image: '/projects/microservices.jpg',
    featured: true,
    highlights: [
      'API Gateway com rate limiting',
      'Service mesh com Istio',
      'Observabilidade completa (Prometheus + Grafana)',
      'Circuit breaker e retry policies',
      'Deploy automatizado no Kubernetes'
    ],
    challenges: [
      {
        title: 'Comunicação entre Serviços',
        description: 'Latência e confiabilidade na comunicação distribuída',
        solution: 'Implementação de gRPC para comunicação eficiente e service mesh para resiliência'
      }
    ]
  },
  {
    id: 4,
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    description: 'Dashboard analytics com machine learning para predições e insights automatizados.',
    longDescription: 'Dashboard analítico avançado que utiliza machine learning para gerar insights automáticos e predições. Processa grandes volumes de dados utilizando Python e apresenta visualizações interativas através de interface React moderna.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    link: 'https://analytics.example.com',
    github: 'https://github.com/ivobraatz/ai-analytics',
    image: '/projects/ai-analytics.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    highlights: [
      'Predições com Machine Learning',
      'Visualizações interativas',
      'Processamento de Big Data',
      'API RESTful em FastAPI'
    ]
  },
  {
    id: 5,
    title: 'Serverless API Infrastructure',
    slug: 'serverless-api-infrastructure',
    description: 'Infraestrutura serverless com API Gateway, Lambda functions e event-driven architecture.',
    longDescription: 'Arquitetura completamente serverless na AWS, implementando patterns de event-driven architecture. Utiliza Lambda functions para processamento sob demanda, DynamoDB para armazenamento de dados e EventBridge para comunicação assíncrona entre componentes.',
    technologies: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'CloudFormation'],
    github: 'https://github.com/ivobraatz/serverless-api',
    image: '/projects/serverless.jpg',
    featured: false,
    highlights: [
      'Arquitetura event-driven',
      'Auto-scaling automático',
      'Pay-per-use (custo otimizado)',
      'Infrastructure as Code'
    ]
  },
  {
    id: 6,
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'Plataforma de e-commerce de alta performance com checkout otimizado e gestão completa.',
    longDescription: 'Plataforma completa de e-commerce com foco em performance e conversão. Implementa checkout otimizado em etapas, integração com Stripe para pagamentos, gestão de estoque em tempo real e painel administrativo completo.',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
    link: 'https://shop-demo.example.com',
    github: 'https://github.com/ivobraatz/ecommerce',
    image: '/projects/ecommerce.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    featured: false,
    highlights: [
      'Checkout otimizado (3 etapas)',
      'Integração com Stripe',
      'Gestão de estoque em tempo real',
      'Painel administrativo completo',
      'SEO otimizado para produtos'
    ]
  }
]

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Senior Software Engineer',
    period: '2023 - Presente',
    description: 'Liderança técnica no desenvolvimento de aplicações enterprise. Arquitetura de sistemas escaláveis e mentoria de equipe.',
    current: true
  },
  {
    id: 2,
    company: 'Digital Innovation Labs',
    position: 'Full Stack Developer',
    period: '2021 - 2023',
    description: 'Desenvolvimento de aplicações web modernas com foco em performance e experiência do usuário. Implementação de CI/CD e práticas DevOps.'
  },
  {
    id: 3,
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    period: '2020 - 2021',
    description: 'Criação de interfaces responsivas e acessíveis. Otimização de performance e implementação de design systems.'
  }
]

export const NAV_ITEMS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' }
]
