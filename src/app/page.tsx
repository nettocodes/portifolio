"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedTitle from "@/components/AnimatedTitle";
import AnimatedButton from "@/components/AnimatedButton";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import CustomCursor from "@/components/CustomCursor";
import InteractiveBackground from "@/components/InteractiveBackground";
import ScrollParallax from "@/components/ScrollParallax";
import MorphingText from "@/components/MorphingText";
import AnimatedCounter from "@/components/AnimatedCounter";
import { 
  Code, Globe, Database, Zap, Palette, 
  Users, Award, Clock, Star, 
  Mail, Phone, MapPin, Linkedin, Github, Twitter,
  ChevronDown, ArrowRight, ExternalLink, Github as GithubIcon,
  MousePointer, Keyboard, Monitor, Smartphone
} from "lucide-react";
import Hero from "@/components/Hero";

// Dados dos projetos
const projetos = [
  { 
    id: 1, 
    nome: "E-commerce Platform", 
    tipo: "freela", 
    descricao: "Plataforma completa de e-commerce com React, Next.js e Stripe. Interface moderna e responsiva com mais de 10k usuários ativos.",
    technologies: ["React", "Next.js", "Stripe", "Tailwind", "MongoDB"],
    link: "https://demo-ecommerce.com",
    github: "https://github.com/user/ecommerce",
    image: "/project1.jpg"
  },
  { 
    id: 2, 
    nome: "Task Management App", 
    tipo: "pessoal", 
    descricao: "Aplicativo de gerenciamento de tarefas com drag & drop, notificações e sincronização em tempo real.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    link: "https://task-app-demo.com",
    github: "https://github.com/user/task-app",
    image: "/project2.jpg"
  },
  { 
    id: 3, 
    nome: "UI Component Library", 
    tipo: "open-source", 
    descricao: "Biblioteca de componentes React reutilizáveis com documentação completa e testes automatizados.",
    technologies: ["React", "TypeScript", "Storybook", "Jest", "Vite"],
    github: "https://github.com/user/ui-library",
    image: "/project3.jpg"
  },
  { 
    id: 4, 
    nome: "AI Chat Application", 
    tipo: "freela", 
    descricao: "Aplicação de chat com IA usando OpenAI, interface conversacional e análise de sentimentos.",
    technologies: ["React", "OpenAI", "Node.js", "PostgreSQL", "Docker"],
    link: "https://ai-chat-demo.com",
    github: "https://github.com/user/ai-chat",
    image: "/project4.jpg"
  },
];

// Dados das skills
const skills = [
  { nome: "React", nivel: 90, icon: Code, description: "Desenvolvimento de interfaces modernas" },
  { nome: "Next.js", nivel: 85, icon: Globe, description: "Aplicações full-stack performáticas" },
  { nome: "Node.js", nivel: 80, icon: Database, description: "Backend escalável e APIs RESTful" },
  { nome: "GSAP", nivel: 70, icon: Zap, description: "Animações avançadas e interativas" },
  { nome: "Framer Motion", nivel: 75, icon: Palette, description: "Microinterações e transições" },
  { nome: "TypeScript", nivel: 85, icon: Code, description: "Desenvolvimento tipado e seguro" },
];

// Dados de experiência
const experiences = [
  {
    year: "2023 - Presente",
    title: "Senior Full-Stack Developer",
    company: "TechCorp",
    description: "Liderando equipes de desenvolvimento e arquitetando soluções escaláveis."
  },
  {
    year: "2021 - 2023",
    title: "Frontend Developer",
    company: "StartupXYZ",
    description: "Desenvolvimento de interfaces modernas e otimização de performance."
  },
  {
    year: "2019 - 2021",
    title: "Junior Developer",
    company: "DigitalAgency",
    description: "Criação de sites e aplicações web responsivas."
  }
];

// Dados de serviços
const services = [
  {
    icon: Monitor,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web modernas e responsivas",
    features: ["React/Next.js", "TypeScript", "Performance", "SEO"]
  },
  {
    icon: Smartphone,
    title: "Aplicações Mobile",
    description: "Apps nativos e híbridos para iOS e Android",
    features: ["React Native", "Flutter", "PWA", "Nativo"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces intuitivas e experiências memoráveis",
    features: ["Figma", "Prototipagem", "Design System", "Acessibilidade"]
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Sistemas robustos e APIs escaláveis",
    features: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
  }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredProjects = activeFilter === "todos" 
    ? projetos 
    : projetos.filter(proj => proj.tipo === activeFilter);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <CustomCursor />
      <InteractiveBackground />
      <Header />
      <Hero />
      
      {/* Stats Section - Full Width */}
      <section style={{ 
        width: '100%',
        padding: '4rem 1rem',
        background: 'var(--card-bg)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1200px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={50} suffix="+" />
            <p style={{ color: 'var(--foreground)', marginTop: '0.5rem' }}>Projetos Concluídos</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={5} suffix=" anos" />
            <p style={{ color: 'var(--foreground)', marginTop: '0.5rem' }}>Experiência</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={100} suffix="%" />
            <p style={{ color: 'var(--foreground)', marginTop: '0.5rem' }}>Satisfação do Cliente</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <AnimatedCounter end={24} suffix="h" />
            <p style={{ color: 'var(--foreground)', marginTop: '0.5rem' }}>Suporte Disponível</p>
          </div>
        </div>
      </section>

      {/* Sobre Section - Full Width */}
      <section id="sobre" style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--background)'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Coluna da esquerda - Avatar e info */}
          <ScrollParallax speed={0.2} direction="left">
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                padding: '4px',
                position: 'relative'
              }}>
        <Image
                  src="/avatar.png" 
                  alt="Avatar" 
                  width={192} 
                  height={192} 
                  style={{ borderRadius: '50%', objectFit: 'cover' }} 
                />
              </div>
              <AnimatedTitle text="Sobre mim" as="h2" />
              <p style={{ 
                marginBottom: '2rem', 
                color: 'var(--foreground)',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                Sou desenvolvedor web full-stack apaixonado por criar soluções digitais inovadoras. 
                Tenho experiência com React, Next.js, Node.js e animações modernas.
              </p>
            </div>
          </ScrollParallax>

          {/* Coluna da direita - Destaques */}
          <ScrollParallax speed={0.2} direction="right">
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '2rem', 
                color: 'var(--foreground)',
                fontWeight: 600
              }}>
                Destaques da Carreira
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Award size={24} color="var(--primary)" />
                  <div>
                    <h4 style={{ color: 'var(--foreground)', fontWeight: 600 }}>+5 anos de experiência</h4>
                    <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Desenvolvimento web profissional</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Users size={24} color="var(--primary)" />
                  <div>
                    <h4 style={{ color: 'var(--foreground)', fontWeight: 600 }}>+50 projetos entregues</h4>
                    <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Para empresas e startups</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Star size={24} color="var(--primary)" />
                  <div>
                    <h4 style={{ color: 'var(--foreground)', fontWeight: 600 }}>100% satisfação</h4>
                    <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Clientes satisfeitos</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollParallax>
        </div>
      </section>

      {/* Serviços Section - Full Width */}
      <section style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--card-bg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedTitle text="Serviços que Ofereço" as="h2" />
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--foreground)', 
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Soluções completas para transformar suas ideias em realidade digital.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={service.title}
                style={{ 
                  background: 'var(--background)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid var(--card-border)',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 40px rgba(0, 207, 255, 0.1)'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <IconComponent size={28} color="white" />
                </div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 600, 
                  color: 'var(--foreground)',
                  marginBottom: '0.5rem'
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.8,
                  marginBottom: '1rem',
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {service.features.map((feature) => (
                    <span key={feature} style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      background: 'var(--card-bg)',
                      color: 'var(--primary)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Projetos Section - Full Width */}
      <section id="projetos" style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--background)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedTitle text="Projetos em Destaque" as="h2" />
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--foreground)', 
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Uma seleção dos meus melhores trabalhos, demonstrando habilidades técnicas e criatividade.
          </p>
        </div>
        
        {/* Filtros */}
        <ProjectFilters 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredProjects.map(proj => (
            <ProjectCard
              key={proj.id}
              title={proj.nome}
              description={proj.descricao}
              type={proj.tipo}
              link={proj.link}
              github={proj.github}
              technologies={proj.technologies}
            />
          ))}
        </div>
      </section>

      {/* Skills Section - Full Width */}
      <section id="skills" style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--card-bg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedTitle text="Skills & Tecnologias" as="h2" />
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--foreground)', 
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Tecnologias que domino e utilizo diariamente para criar soluções inovadoras.
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {skills.map(skill => {
            const IconComponent = skill.icon;
            return (
              <motion.div 
                key={skill.nome}
                style={{ 
                  background: 'var(--background)',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid var(--card-border)',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
                whileHover={{ 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0, 207, 255, 0.1)'
                }}
              >
                <IconComponent size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 600, 
                  color: 'var(--foreground)',
                  marginBottom: '0.5rem'
                }}>
                  {skill.nome}
                </h3>
                <p style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.8,
                  marginBottom: '1rem'
                }}>
                  {skill.description}
                </p>
                <div style={{ 
                  background: 'var(--card-bg)', 
                  borderRadius: '8px', 
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <motion.div 
                    style={{ 
                      width: `${skill.nivel}%`, 
                      background: 'linear-gradient(90deg, var(--primary), var(--secondary))', 
                      height: '100%',
                      borderRadius: '8px'
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.nivel}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  display: 'block'
                }}>
                  {skill.nivel}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Experiência Section - Full Width */}
      <section style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--background)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <AnimatedTitle text="Experiência Profissional" as="h2" />
        </div>
        
        <div style={{ 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              style={{ 
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: '2rem',
                padding: '2rem 0',
                borderBottom: index < experiences.length - 1 ? '1px solid var(--card-border)' : 'none'
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div>
                <span style={{ 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  fontSize: '1.1rem'
                }}>
                  {exp.year}
                </span>
              </div>
              <div>
                <h3 style={{ 
                  color: 'var(--foreground)', 
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem'
                }}>
                  {exp.title}
                </h3>
                <p style={{ 
                  color: 'var(--secondary)', 
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }}>
                  {exp.company}
                </p>
                <p style={{ 
                  color: 'var(--foreground)', 
                  opacity: 0.8,
                  lineHeight: 1.6
                }}>
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contato Section - Full Width */}
      <section id="contato" style={{ 
        width: '100%',
        padding: '6rem 1rem',
        background: 'var(--card-bg)'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Informações de contato */}
          <div>
            <AnimatedTitle text="Vamos Conversar?" as="h2" />
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--foreground)', 
              opacity: 0.8,
              marginBottom: '2rem'
            }}>
              Entre em contato para conversarmos sobre seu projeto ou oportunidade!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={20} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)' }}>seu@email.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={20} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)' }}>+55 (11) 99999-9999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin size={20} color="var(--primary)" />
                <span style={{ color: 'var(--foreground)' }}>São Paulo, SP - Brasil</span>
              </div>
            </div>

            {/* Redes sociais */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem' 
            }}>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--background)',
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                <Linkedin size={20} />
              </a>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--background)',
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                <Github size={20} />
              </a>
              <a href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--background)',
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Formulário de contato */}
          <div style={{ 
            background: 'var(--background)',
            padding: '2rem',
            borderRadius: '16px',
            border: '1px solid var(--card-border)'
          }}>
            <h3 style={{ 
              color: 'var(--foreground)', 
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              Envie uma mensagem
            </h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Seu nome" 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'var(--foreground)',
                  fontSize: '1rem'
                }}
              />
              <input 
                type="email" 
                placeholder="Seu email" 
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'var(--foreground)',
                  fontSize: '1rem'
                }}
              />
              <textarea 
                placeholder="Sua mensagem" 
                rows={5}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                  color: 'var(--foreground)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
              <AnimatedButton type="submit">
                Enviar Mensagem
              </AnimatedButton>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
