'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
  translateExperience: (id: number, field: 'position' | 'period' | 'description') => string
  translateProject: (id: number, field: 'description' | 'longDescription') => string
}

const translations = {
  pt: {
    // Header
    'nav.about': 'Sobre',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.greeting': 'Olá, eu sou',
    'hero.label': 'Desenvolvedor de Software',
    'hero.title': 'Desenvolvedor de Software',
    'hero.subtitle': 'Especializado em criar soluções elegantes e escaláveis',
    'hero.bio': 'Desenvolvedor apaixonado por criar soluções digitais inovadoras e escaláveis. Especializado em transformar ideias complexas em aplicações elegantes e funcionais.',
    'hero.cta': 'Ver Projetos',
    'hero.contactButton': 'Entre em Contato',
    'hero.projectsButton': 'Ver Projetos',
    'hero.yearsExperience': 'Anos de Experiência',
    'hero.projectsCompleted': 'Projetos Completos',
    'hero.happyClients': 'Clientes Satisfeitos',
    'hero.stats.experience': 'Anos de Experiência',
    'hero.stats.projects': 'Projetos Concluídos',
    'hero.stats.technologies': 'Tecnologias',
    
    // About
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Desenvolvedor apaixonado por arquitetura de software e código de qualidade',
    'about.lead': 'Transformo ideias complexas em soluções elegantes através de código limpo e arquitetura bem pensada.',
    'about.paragraph1': 'Com mais de 5 anos desenvolvendo aplicações web full-stack, especializei-me em criar sistemas escaláveis que equilibram performance, maintibilidade e experiência do usuário. Minha jornada no desenvolvimento começou com curiosidade sobre como as coisas funcionam - hoje, essa curiosidade se transformou em expertise técnica sólida.',
    'about.paragraph2': 'Trabalho principalmente com TypeScript, React, Next.js no frontend e Node.js, Python no backend, sempre buscando as melhores práticas em arquitetura de software, cloud computing e DevOps. Acredito que código bem escrito não é apenas funcional - é uma forma de comunicação entre desenvolvedores.',
    'about.paragraph3': 'Quando não estou codificando, estou estudando novos padrões de arquitetura, contribuindo em projetos open source, ou compartilhando conhecimento com a comunidade dev. Meu objetivo é sempre crescer como profissional e ajudar outros desenvolvedores em sua jornada.',
    'about.valuesTitle': 'Valores que guiam meu trabalho',
    
    // Experience
    'experience.title': 'Experiência',
    'experience.subtitle': 'Minha jornada profissional no desenvolvimento de software',
    'experience.current': 'Atual',
    
    // Projects
    'projects.title': 'Projetos',
    'projects.subtitle': 'Alguns dos meus trabalhos mais recentes',
    'projects.other': 'Outros Projetos',
    
    // Contact
    'contact.title': 'Contato',
    'contact.subtitle': 'Vamos construir algo incrível juntos',
    'contact.info.title': 'Vamos conversar',
    'contact.info.description': 'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.',
    'contact.form.name': 'Nome Completo',
    'contact.form.email': 'Email',
    'contact.form.message': 'Mensagem',
    'contact.form.placeholder.name': 'João Silva',
    'contact.form.placeholder.email': 'joao@exemplo.com',
    'contact.form.placeholder.message': 'Conte-me sobre seu projeto ou ideia...',
    'contact.form.chars': 'caracteres',
    'contact.form.submit': 'Enviar Mensagem',
    
    // Footer
    'footer.location': 'Brasil',
    'footer.navigation': 'Navegação',
    'footer.social': 'Redes Sociais',
    'footer.rights': 'Todos os direitos reservados.',
    
    // Project Page
    'project.back': 'Voltar para projetos',
    'project.viewCode': 'Ver código',
    'project.viewDemo': 'Ver demo',
    'project.demonstration': 'Demonstração',
    'project.about': 'Sobre o Projeto',
    'project.features': 'Principais Features',
    'project.challenges': 'Desafios & Soluções',
    'project.challenge': 'Desafio',
    'project.solution': 'Solução',
    'project.allProjects': 'Ver todos os projetos'
  },
  en: {
    // Header
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hi, I\'m',
    'hero.label': 'Software Developer',
    'hero.title': 'Software Developer',
    'hero.subtitle': 'Specialized in creating elegant and scalable solutions',
    'hero.bio': 'Passionate developer creating innovative and scalable digital solutions. Specialized in transforming complex ideas into elegant and functional applications.',
    'hero.cta': 'View Projects',
    'hero.contactButton': 'Get in Touch',
    'hero.projectsButton': 'View Projects',
    'hero.yearsExperience': 'Years of Experience',
    'hero.projectsCompleted': 'Projects Completed',
    'hero.happyClients': 'Happy Clients',
    'hero.stats.experience': 'Years of Experience',
    'hero.stats.projects': 'Completed Projects',
    'hero.stats.technologies': 'Technologies',
    
    // About
    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer focused on software architecture and quality code',
    'about.lead': 'I transform complex ideas into elegant solutions through clean code and well-thought architecture.',
    'about.paragraph1': 'With over 5 years developing full-stack web applications, I specialize in creating scalable systems that balance performance, maintainability, and user experience. My development journey started with curiosity about how things work - today, that curiosity has evolved into solid technical expertise.',
    'about.paragraph2': 'I work primarily with TypeScript, React, Next.js on the frontend and Node.js, Python on the backend, always seeking best practices in software architecture, cloud computing, and DevOps. I believe well-written code isn\'t just functional - it\'s a form of communication between developers.',
    'about.paragraph3': 'When I\'m not coding, I\'m studying new architecture patterns, contributing to open source projects, or sharing knowledge with the dev community. My goal is always to grow professionally and help other developers on their journey.',
    'about.valuesTitle': 'Values that guide my work',
    
    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'My professional journey in software development',
    'experience.current': 'Current',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my most recent work',
    'projects.other': 'Other Projects',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Let\'s build something amazing together',
    'contact.info.title': 'Let\'s talk',
    'contact.info.description': 'I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.placeholder.name': 'John Doe',
    'contact.form.placeholder.email': 'john@example.com',
    'contact.form.placeholder.message': 'Tell me about your project or idea...',
    'contact.form.chars': 'characters',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.location': 'Brazil',
    'footer.navigation': 'Navigation',
    'footer.social': 'Social Media',
    'footer.rights': 'All rights reserved.',
    
    // Project Page
    'project.back': 'Back to projects',
    'project.viewCode': 'View code',
    'project.viewDemo': 'View demo',
    'project.demonstration': 'Demonstration',
    'project.about': 'About the Project',
    'project.features': 'Key Features',
    'project.challenges': 'Challenges & Solutions',
    'project.challenge': 'Challenge',
    'project.solution': 'Solution',
    'project.allProjects': 'View all projects'
  }
}

// Data translations
const experienceTranslations = {
  pt: {
    1: {
      position: 'Engenheiro de Software Sênior',
      period: '2023 - Presente',
      description: 'Liderança técnica no desenvolvimento de aplicações enterprise. Arquitetura de sistemas escaláveis e mentoria de equipe.'
    },
    2: {
      position: 'Desenvolvedor Full Stack',
      period: '2021 - 2023',
      description: 'Desenvolvimento de aplicações web modernas com foco em performance e experiência do usuário. Implementação de CI/CD e práticas DevOps.'
    },
    3: {
      position: 'Desenvolvedor Frontend',
      period: '2020 - 2021',
      description: 'Criação de interfaces responsivas e acessíveis. Otimização de performance e implementação de design systems.'
    }
  },
  en: {
    1: {
      position: 'Senior Software Engineer',
      period: '2023 - Present',
      description: 'Technical leadership in enterprise application development. Scalable systems architecture and team mentoring.'
    },
    2: {
      position: 'Full Stack Developer',
      period: '2021 - 2023',
      description: 'Modern web application development focused on performance and user experience. CI/CD implementation and DevOps practices.'
    },
    3: {
      position: 'Frontend Developer',
      period: '2020 - 2021',
      description: 'Creation of responsive and accessible interfaces. Performance optimization and design systems implementation.'
    }
  }
}

const projectTranslations = {
  pt: {
    1: {
      description: 'Plataforma SaaS completa com multi-tenancy, autenticação avançada e dashboards analíticos em tempo real.',
      longDescription: 'Uma plataforma SaaS enterprise robusta construída para escalar. O sistema implementa multi-tenancy completo, permitindo que múltiplas organizações utilizem a mesma infraestrutura com isolamento total de dados.'
    },
    2: {
      description: 'Ferramenta de colaboração em tempo real com WebSocket, edição simultânea e sincronização de estado.',
      longDescription: 'Aplicação de colaboração em tempo real inspirada em ferramentas como Figma e Google Docs. Permite que múltiplos usuários editem documentos simultaneamente com sincronização instantânea de mudanças.'
    },
    3: {
      description: 'Arquitetura de microserviços escalável com API Gateway, service mesh e observabilidade completa.',
      longDescription: 'Sistema distribuído baseado em microserviços implementando patterns modernos de arquitetura cloud-native. Utiliza API Gateway para roteamento inteligente, service mesh para comunicação segura entre serviços.'
    },
    4: {
      description: 'Dashboard analytics com machine learning para predições e insights automatizados.',
      longDescription: 'Dashboard analítico avançado que utiliza machine learning para gerar insights automáticos e predições. Processa grandes volumes de dados utilizando Python e apresenta visualizações interativas.'
    },
    5: {
      description: 'API REST robusta com autenticação JWT, rate limiting e documentação Swagger completa.',
      longDescription: 'API RESTful enterprise-grade com foco em segurança, performance e documentação. Implementa rate limiting adaptativo, circuit breakers e retry policies para alta disponibilidade.'
    },
    6: {
      description: 'Progressive Web App com offline-first, push notifications e instalação nativa.',
      longDescription: 'PWA moderno que funciona offline-first utilizando Service Workers e IndexedDB. Oferece experiência nativa com push notifications, instalação na home screen e sincronização em background.'
    }
  },
  en: {
    1: {
      description: 'Complete SaaS platform with multi-tenancy, advanced authentication, and real-time analytics dashboards.',
      longDescription: 'A robust enterprise SaaS platform built to scale. The system implements complete multi-tenancy, allowing multiple organizations to use the same infrastructure with total data isolation.'
    },
    2: {
      description: 'Real-time collaboration tool with WebSocket, simultaneous editing, and state synchronization.',
      longDescription: 'Real-time collaboration application inspired by tools like Figma and Google Docs. Allows multiple users to edit documents simultaneously with instant change synchronization.'
    },
    3: {
      description: 'Scalable microservices architecture with API Gateway, service mesh, and complete observability.',
      longDescription: 'Distributed system based on microservices implementing modern cloud-native architecture patterns. Uses API Gateway for intelligent routing, service mesh for secure service communication.'
    },
    4: {
      description: 'Analytics dashboard with machine learning for predictions and automated insights.',
      longDescription: 'Advanced analytics dashboard that uses machine learning to generate automatic insights and predictions. Processes large data volumes using Python and presents interactive visualizations.'
    },
    5: {
      description: 'Robust REST API with JWT authentication, rate limiting, and complete Swagger documentation.',
      longDescription: 'Enterprise-grade RESTful API focused on security, performance, and documentation. Implements adaptive rate limiting, circuit breakers, and retry policies for high availability.'
    },
    6: {
      description: 'Progressive Web App with offline-first, push notifications, and native installation.',
      longDescription: 'Modern PWA that works offline-first using Service Workers and IndexedDB. Offers native experience with push notifications, home screen installation, and background sync.'
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key
  }

  const translateExperience = (id: number, field: 'position' | 'period' | 'description'): string => {
    const exp = experienceTranslations[language][id as keyof typeof experienceTranslations.pt]
    return exp ? exp[field] : ''
  }

  const translateProject = (id: number, field: 'description' | 'longDescription'): string => {
    const proj = projectTranslations[language][id as keyof typeof projectTranslations.pt]
    return proj ? proj[field] : ''
  }

  // Always provide the context, even before mounting
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, translateExperience, translateProject }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
