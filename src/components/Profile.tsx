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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdown(prev => prev === categoryId ? null : categoryId);
  };

  // Calcular quantos items são visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setItemsPerView(1);
      } else if (width <= 768) {
        setItemsPerView(2);
      } else if (width <= 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Navegação do carrossel
  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, dropdownCategories.length - itemsPerView);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Calcular se os botões devem estar habilitados
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < dropdownCategories.length - itemsPerView;

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

  // Atualizar posição do carrossel
  useEffect(() => {
    if (trackRef.current) {
      const itemWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 180;
      const gap = 8; // 0.5rem = 8px
      const translateX = -(currentIndex * (itemWidth + gap));
      trackRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentIndex]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.categoriesContainer} ${openDropdown ? styles.hasOpenDropdown : ''}`}
    >
      {/* Botão Anterior */}
      <button 
        className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
        onClick={goToPrevious}
        disabled={!canGoPrevious}
        aria-label="Categoria anterior"
      >
        <div className={styles.carouselButtonInner}>
          <div className={styles.carouselButtonTopWhite} />
        </div>
        <div className={styles.arrow}></div>
      </button>

      {/* Container do Carrossel */}
      <div className={styles.categoriesCarousel}>
        <div ref={trackRef} className={styles.categoriesTrack}>
          {dropdownCategories.map((category) => (
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

      {/* Botão Próximo */}
      <button 
        className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
        onClick={goToNext}
        disabled={!canGoNext}
        aria-label="Próxima categoria"
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
  );
};

export default Profile;
