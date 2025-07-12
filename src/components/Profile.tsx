import React, { memo, useRef, useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ivoImg from '../assets/ivo.jpg';
import {
  Calendar,
  FolderOpen,
  Coffee,
  MusicNote,
  Camera,
  Airplane,
  CaretDown,
  CaretUp,
  Code,
  User,
  Phone,
  Briefcase,
  Heart,
  Globe,
  Database,
  PaintBrush,
  GameController,
  Book,
  Link,
} from 'phosphor-react';

const stats = [
  {
    icon: <Calendar weight="fill" />,
    number: '5+',
    label: 'Anos',
  },
  {
    icon: <FolderOpen weight="fill" />,
    number: '50+',
    label: 'Projetos',
  },
  {
    icon: <Coffee weight="fill" />,
    number: '∞',
    label: 'Café',
  },
];

interface CategoryItem {
  icon: React.ReactNode;
  label: string;
  type: 'hobby' | 'link' | 'info' | 'skill';
  url?: string;
}

interface DropdownCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: CategoryItem[];
}

const dropdownCategories: DropdownCategory[] = [
  {
    id: 'hobbies',
    title: 'Hobbies',
    icon: <Heart weight="fill" />,
    items: [
      { icon: <MusicNote weight="fill" />, label: 'Música', type: 'hobby' },
      { icon: <Camera weight="fill" />, label: 'Fotografia', type: 'hobby' },
      { icon: <Airplane weight="fill" />, label: 'Viagens', type: 'hobby' },
      { icon: <Coffee weight="fill" />, label: 'Café', type: 'hobby' },
      { icon: <GameController weight="fill" />, label: 'Games', type: 'hobby' },
      { icon: <Book weight="fill" />, label: 'Leitura', type: 'hobby' },
    ]
  },
  {
    id: 'projects',
    title: 'Projetos',
    icon: <FolderOpen weight="fill" />,
    items: [
      { icon: <Globe weight="fill" />, label: 'Portfolio Website', type: 'link', url: 'https://github.com/IvoBraatz/portifolio' },
      { icon: <Database weight="fill" />, label: 'Sistema ERP', type: 'link', url: '#' },
      { icon: <Code weight="fill" />, label: 'API RestFul', type: 'link', url: '#' },
      { icon: <PaintBrush weight="fill" />, label: 'Design System', type: 'link', url: '#' },
      { icon: <Globe weight="fill" />, label: 'E-commerce', type: 'link', url: '#' },
    ]
  },
  {
    id: 'about',
    title: 'Sobre Mim',
    icon: <User weight="fill" />,
    items: [
      { icon: <Briefcase weight="fill" />, label: 'Desenvolvedor Full Stack', type: 'info' },
      { icon: <Code weight="fill" />, label: '5+ anos de experiência', type: 'info' },
      { icon: <Heart weight="fill" />, label: 'Apaixonado por tecnologia', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Brasileiro, São Paulo', type: 'info' },
    ]
  },
  {
    id: 'skills',
    title: 'Habilidades',
    icon: <Code weight="fill" />,
    items: [
      { icon: <Globe weight="fill" />, label: 'React/Next.js', type: 'skill' },
      { icon: <Database weight="fill" />, label: 'Node.js/Express', type: 'skill' },
      { icon: <Code weight="fill" />, label: 'TypeScript', type: 'skill' },
      { icon: <Database weight="fill" />, label: 'PostgreSQL/MongoDB', type: 'skill' },
      { icon: <PaintBrush weight="fill" />, label: 'SCSS/Tailwind', type: 'skill' },
    ]
  },
  {
    id: 'contact',
    title: 'Contato',
    icon: <Phone weight="fill" />,
    items: [
      { icon: <Link weight="fill" />, label: 'GitHub', type: 'link', url: 'https://github.com/IvoBraatz' },
      { icon: <Link weight="fill" />, label: 'LinkedIn', type: 'link', url: '#' },
      { icon: <Phone weight="fill" />, label: 'Email', type: 'link', url: 'mailto:ivo@exemplo.com' },
      { icon: <Globe weight="fill" />, label: 'Website', type: 'link', url: '#' },
    ]
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    icon: <PaintBrush weight="fill" />,
    items: [
      { icon: <Code weight="fill" />, label: 'VS Code', type: 'info' },
      { icon: <Database weight="fill" />, label: 'Docker', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Figma', type: 'info' },
      { icon: <Link weight="fill" />, label: 'Postman', type: 'info' },
      { icon: <PaintBrush weight="fill" />, label: 'Adobe Creative Suite', type: 'info' },
    ]
  },
  {
    id: 'education',
    title: 'Formação',
    icon: <Book weight="fill" />,
    items: [
      { icon: <Book weight="fill" />, label: 'Ciência da Computação', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Certificação AWS', type: 'info' },
      { icon: <Code weight="fill" />, label: 'Certificação React', type: 'info' },
      { icon: <Database weight="fill" />, label: 'Certificação Node.js', type: 'info' },
    ]
  },
  {
    id: 'experience',
    title: 'Experiência',
    icon: <Briefcase weight="fill" />,
    items: [
      { icon: <Briefcase weight="fill" />, label: 'Senior Developer - 2022-2024', type: 'info' },
      { icon: <Code weight="fill" />, label: 'Full Stack Developer - 2020-2022', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Frontend Developer - 2018-2020', type: 'info' },
      { icon: <Database weight="fill" />, label: 'Junior Developer - 2016-2018', type: 'info' },
    ]
  },
  {
    id: 'languages',
    title: 'Idiomas',
    icon: <Globe weight="fill" />,
    items: [
      { icon: <Globe weight="fill" />, label: 'Português - Nativo', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Inglês - Avançado', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Espanhol - Intermediário', type: 'info' },
      { icon: <Globe weight="fill" />, label: 'Francês - Básico', type: 'info' },
    ]
  },
  {
    id: 'certifications',
    title: 'Certificações',
    icon: <Calendar weight="fill" />,
    items: [
      { icon: <Database weight="fill" />, label: 'AWS Solutions Architect', type: 'link', url: '#' },
      { icon: <Code weight="fill" />, label: 'React Developer Certification', type: 'link', url: '#' },
      { icon: <Globe weight="fill" />, label: 'Google Cloud Professional', type: 'link', url: '#' },
      { icon: <PaintBrush weight="fill" />, label: 'Adobe Certified Expert', type: 'link', url: '#' },
      { icon: <Link weight="fill" />, label: 'Scrum Master Certification', type: 'link', url: '#' },
    ]
  },
];

const Avatar = memo(() => (
  <div className={styles.avatar}>
    <img src={ivoImg} alt="Ivo Netto" loading="lazy" />
    <div className={styles.avatarOverlay} aria-hidden="true"></div>
  </div>
));

const StatsSection = memo(() => (
  <div className={styles.stats}>
    {stats.map((stat, index) => (
      <div key={index} className={styles.statItem}>
        <div className={styles.statIcon}>{stat.icon}</div>
        <div className={styles.statNumber}>{stat.number}</div>
        <div className={styles.statLabel}>{stat.label}</div>
      </div>
    ))}
  </div>
));

const DropdownItem = memo(({ item, onItemClick }: { 
  item: CategoryItem; 
  onItemClick: (item: CategoryItem) => void;
}) => {
  const handleClick = () => {
    if (item.type === 'link' && item.url) {
      if (item.url.startsWith('http')) {
        window.open(item.url, '_blank');
      } else if (item.url.startsWith('mailto')) {
        window.location.href = item.url;
      } else {
        // Handle internal links
        console.log('Navigate to:', item.url);
      }
    }
    onItemClick(item);
  };

  return (
    <div 
      className={`${styles.dropdownItem} ${item.type === 'link' ? styles.dropdownItemLink : ''}`}
      onClick={handleClick}
    >
      <div className={styles.dropdownItemIcon}>{item.icon}</div>
      <span className={styles.dropdownItemLabel}>{item.label}</span>
      {item.type === 'link' && <Link weight="bold" className={styles.dropdownItemLinkIcon} />}
    </div>
  );
});

const CategoryDropdown = memo(({ category, isOpen, onToggle }: {
  category: DropdownCategory;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleItemClick = (item: CategoryItem) => {
    console.log('Item clicked:', item);
  };

  return (
    <div className={`${styles.categoryDropdown} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.categoryButton}
        onClick={handleToggle}
        aria-controls={`dropdown-${category.id}`}
      >
        <div className={styles.categoryIcon}>{category.icon}</div>
        <span className={styles.categoryTitle}>{category.title}</span>
        <div className={`${styles.categoryArrow} ${isOpen ? styles.rotated : ''}`}>
          {isOpen ? <CaretUp weight="bold" /> : <CaretDown weight="bold" />}
        </div>
      </button>
      
      <div 
        id={`dropdown-${category.id}`}
        className={`${styles.dropdownContent} ${isOpen ? styles.show : ''} ${isAnimating ? styles.animating : ''}`}
      >
        <div className={styles.dropdownInner}>
          {category.items.map((item: CategoryItem, index: number) => (
            <DropdownItem 
              key={`${category.id}-${index}`}
              item={item}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const CategoriesSection = memo(() => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(prev => prev === categoryId ? null : categoryId);
  };

  // Calcular quantos items são visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 320) {
        setItemsPerPage(1); // Mobile muito pequeno - 1 item
      } else if (width <= 480) {
        setItemsPerPage(2); // Mobile - 2 itens
      } else if (width <= 768) {
        setItemsPerPage(3); // Tablet portrait - 3 itens
      } else if (width <= 1024) {
        setItemsPerPage(4); // Tablet landscape - 4 itens
      } else {
        setItemsPerPage(5); // Desktop - 5 itens
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calcular items da página atual
  const totalPages = Math.ceil(dropdownCategories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = dropdownCategories.slice(startIndex, endIndex);

  // Navegação de páginas
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
    setOpenDropdown(null); // Fecha dropdown ao navegar
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    setOpenDropdown(null); // Fecha dropdown ao navegar
  };

  // Calcular se os botões devem estar habilitados
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.categoriesContainer} ${openDropdown ? styles.hasOpenDropdown : ''}`}
    >
      {/* Botão Anterior */}
      <button 
        className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
        onClick={goToPreviousPage}
        disabled={!canGoPrevious}
        aria-label="Página anterior"
      >
        <div className={styles.carouselButtonInner}>
          <div className={styles.carouselButtonTopWhite} />
        </div>
        <div className={styles.arrow}></div>
      </button>

      {/* Container do Carrossel */}
      <div className={`${styles.categoriesCarousel} ${openDropdown ? styles.hasOpenDropdown : ''}`}>
        <div className={styles.carouselWrapper}>
          <div className={styles.categoriesTrack}>
            {currentItems.map((category) => (
              <div key={category.id} className={styles.categoryItem}>
                <CategoryDropdown
                  category={category}
                  isOpen={openDropdown === category.id}
                  onToggle={() => toggleDropdown(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botão Próximo */}
      <button 
        className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
        onClick={goToNextPage}
        disabled={!canGoNext}
        aria-label="Próxima página"
      >
        <div className={styles.carouselButtonInner}>
          <div className={styles.carouselButtonTopWhite} />
        </div>
        <div className={styles.arrow}></div>
      </button>
    </div>
  );
});

const Profile: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.profile} ref={profileRef}>
      <div className={styles.profileContent}>
        {/* Barra de título Windows 7 */}
        <div className={styles.titleBar}>
          <div className={styles.titleBarIcon}></div>
          <div className={styles.titleBarText}>Perfil - Ivo Netto</div>
        </div>

        {/* Botões de controle de janela */}
        <div className={styles.windowControls}>
          <button className={`${styles.windowButton} ${styles.minimizeButton}`} aria-label="Minimizar"></button>
          <button className={`${styles.windowButton} ${styles.maximizeButton}`} aria-label="Maximizar"></button>
          <button className={`${styles.windowButton} ${styles.closeButton}`} aria-label="Fechar"></button>
        </div>

        <div className={styles.profileBorder}>
          <div className={styles.profileInner}>
            {/* Header com foto, nome, cargo e stats */}
            <div className={styles.profileHeader}>
              <Avatar />
              <div className={styles.profileInfo}>
                <div className={styles.nameBlock}>
                  <h2>Ivo Netto</h2>
                  <span className={styles.profileTitle}>Desenvolvedor Full Stack</span>
                </div>
                {/* Stats integradas ao header */}
                <div className={styles.profileRow}>
                  <StatsSection />
                </div>
              </div>
            </div>
            
            {/* Hobbies marquee */}
            <CategoriesSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
