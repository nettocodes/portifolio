import React from 'react';
import styles from './Skills.module.scss';
import HeaderSection from '../../components/HeaderSection';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaAws, 
  FaSass,
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaFigma
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiMysql,
  SiVercel
} from 'react-icons/si';
import SectionWrapper from '../../components/SectionWrapper';

// Mapeamento de ícones para as tecnologias
const techIcons: { [key: string]: React.ComponentType } = {
  'React': FaReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Sass': FaSass,
  'JavaScript': SiJavascript,
  'Node.js': FaNodeJs,
  'Express/NestJS': SiExpress,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'Docker': FaDocker,
  'Git/GitHub': FaGitAlt,
  'AWS': FaAws,
  'Vercel': SiVercel,
  'Linux': FaLinux,
  'Figma': FaFigma
};

// Ícones principais para o fundo decorativo (posições organizadas)
const backgroundIcons = [
  { icon: FaReact, color: '#61DAFB', size: 'large', position: 'pos-1' },
  { icon: SiTypescript, color: '#3178C6', size: 'medium', position: 'pos-2' },
  { icon: FaNodeJs, color: '#339933', size: 'large', position: 'pos-3' },
  { icon: SiNextdotjs, color: '#ffffff', size: 'medium', position: 'pos-4' },
  { icon: FaDatabase, color: '#336791', size: 'small', position: 'pos-5' },
  { icon: SiMongodb, color: '#47A248', size: 'medium', position: 'pos-6' },
];

// Categorias de skills reformuladas para serem mais descritivas
const skillCategories = [
  {
    title: "Frontend Development",
    description: "Especializado em React e Next.js para criar interfaces modernas e performáticas. Domínio completo de TypeScript, Sass e JavaScript ES6+ para desenvolvimento de SPAs escaláveis.",
    icon: FaReact,
    color: '#61DAFB',
    mainTechs: ['React', 'Next.js', 'TypeScript', 'Sass', 'JavaScript'],
  },
  {
    title: "Backend Development", 
    description: "Desenvolvimento de APIs robustas com Node.js e frameworks modernos. Experiência sólida em bancos de dados NoSQL e SQL, além de containerização com Docker.",
    icon: FaNodeJs,
    color: '#339933',
    mainTechs: ['Node.js', 'Express/NestJS', 'MongoDB', 'MySQL', 'Docker'],
  },
  {
    title: "DevOps & Tools",
    description: "Proficiência em ferramentas essenciais para desenvolvimento moderno, desde controle de versão até deploy em cloud. Experiência com AWS e plataformas de CI/CD.",
    icon: FaAws,
    color: '#FF9900',
    mainTechs: ['Git/GitHub', 'AWS', 'Vercel', 'Linux', 'Figma'],
  }
];

// Componente para ícones de fundo decorativos
const BackgroundIcons: React.FC = React.memo(() => {
  return (
    <div className={styles.backgroundIcons}>
      {backgroundIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`${styles.backgroundIcon} ${styles[item.size]} ${styles[item.position]} ${styles[`delay-${index % 8}`]}`}
          >
            <IconComponent />
          </div>
        );
      })}
    </div>
  );
});

BackgroundIcons.displayName = 'BackgroundIcons';

// Componente para categoria de skill mais descritiva
const SkillCategory: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType;
  mainTechs: string[];
  index: number;
}> = React.memo(({ title, description, icon: IconComponent, mainTechs, index }) => {
  // Alternar entre left e right baseado no index
  const fromDirection = index % 2 === 0 ? 'fromLeft' : 'fromRight';
  
  return (
    <div 
      className={`${styles.skillCategory} ${styles[fromDirection]} ${styles[`categoryDelay-${index}`]}`}
    >
      <div className={styles.categoryHeader}>
        <div className={styles.categoryIconContainer}>
          <IconComponent />
        </div>
        <div className={styles.categoryInfo}>
          <div className={styles.titleLevelWrapper}>
            <h3 className={styles.categoryTitle}>{title}</h3>
          </div>
        </div>
      </div>
      
      <p className={styles.categoryDescription}>{description}</p>
      
      <div className={styles.techList}>
        {mainTechs.map((tech, techIndex) => {
          const TechIcon = techIcons[tech];
          return (
            <div key={techIndex} className={styles.techTag}>
              {TechIcon && (
                <span className={styles.techIcon}>
                  <TechIcon />
                </span>
              )}
              <span className={styles.techName}>{tech}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';

// Componente principal Skills
const Skills: React.FC = () => {
  return (
    <SectionWrapper id="skills" className={styles.skills}>
      <div className={styles.visualBg} aria-hidden="true" />
      <BackgroundIcons />
      
      <div className="container">
        <HeaderSection 
          title="Skills & Expertise"
          subtitle="Domínio técnico consolidado através de projetos reais e aprendizado contínuo. Cada tecnologia representa soluções implementadas e desafios superados."
        />

        <div className={styles.skillsGrid}>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={categoryIndex}
              title={category.title}
              description={category.description}
              icon={category.icon}
              mainTechs={category.mainTechs}
              index={categoryIndex}
            />
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Skills;