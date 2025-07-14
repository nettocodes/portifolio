import React, { memo, useRef, useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ivoImg from '../../assets/ivo.jpg';
import HeaderSection from '../../components/HeaderSection';
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

// Declaração do tipo para o Clippy
declare global {
    interface Window {
        clippy: unknown;
    }
}

const stats = [
    {
        icon: <Calendar weight="fill" />,
        number: '3+',
        label: 'Anos',
    },
    {
        icon: <FolderOpen weight="fill" />,
        number: '10+',
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
            { icon: <Database weight="fill" />, label: 'DataRunner', type: 'link', url: '#' },
            { icon: <Code weight="fill" />, label: 'Ordesk', type: 'link', url: '#' },
        ]
    },
    {
        id: 'about',
        title: 'Sobre Mim',
        icon: <User weight="fill" />,
        items: [
            { icon: <Briefcase weight="fill" />, label: 'Desenvolvedor Full Stack', type: 'info' },
            { icon: <Code weight="fill" />, label: '3+ anos de experiência', type: 'info' },
            { icon: <Heart weight="fill" />, label: 'Apaixonado por tecnologia', type: 'info' },
            { icon: <Globe weight="fill" />, label: 'Brasileiro, Santa Catarina', type: 'info' },
        ]
    },
    {
        id: 'skills',
        title: 'Habilidades',
        icon: <Code weight="fill" />,
        items: [
            { icon: <Globe weight="fill" />, label: 'React/Next.js', type: 'skill' },
            { icon: <Code weight="fill" />, label: 'TypeScript', type: 'skill' },
            { icon: <Database weight="fill" />, label: 'Node.js/Express', type: 'skill' },
            { icon: <Database weight="fill" />, label: 'SQL/MySQL/MongoDB', type: 'skill' },
            { icon: <PaintBrush weight="fill" />, label: 'SCSS/CSS', type: 'skill' },
        ]
    },
    {
        id: 'contact',
        title: 'Contato',
        icon: <Phone weight="fill" />,
        items: [
            { icon: <Link weight="fill" />, label: 'GitHub', type: 'link', url: 'https://github.com/IvoBraatz' },
            { icon: <Link weight="fill" />, label: 'LinkedIn', type: 'link', url: 'https://www.linkedin.com/in/ivobraatz/' },
            { icon: <Phone weight="fill" />, label: 'Email', type: 'link', url: 'mailto:braatzivo@hotmail.com' },
            { icon: <Globe weight="fill" />, label: 'Website', type: 'link', url: 'https://ivonetto.vercel.app' },
        ]
    },
    {
        id: 'tools',
        title: 'Ferramentas',
        icon: <PaintBrush weight="fill" />,
        items: [
            { icon: <Code weight="fill" />, label: 'VS Code', type: 'info' },
            { icon: <Link weight="fill" />, label: 'Postman', type: 'info' },
            { icon: <Link weight="fill" />, label: 'Swagger', type: 'info' },
            { icon: <Globe weight="fill" />, label: 'Figma', type: 'info' },
            { icon: <Globe weight="fill" />, label: 'AWS', type: 'info' },
            { icon: <Database weight="fill" />, label: 'Docker', type: 'info' },
            { icon: <Database weight="fill" />, label: 'Git/GitHub', type: 'info' },
            { icon: <Database weight="fill" />, label: 'MongoDB', type: 'info' },
            { icon: <Database weight="fill" />, label: 'MySQL', type: 'info' },
        ]
    },
    {
        id: 'education',
        title: 'Formação',
        icon: <Book weight="fill" />,
        items: [
            { icon: <Book weight="fill" />, label: 'Gestão de TI', type: 'info' },
            { icon: <Globe weight="fill" />, label: '+ 40 Cursos de Programação', type: 'info' },
        ]
    },
    {
        id: 'experience',
        title: 'Experiência',
        icon: <Briefcase weight="fill" />,
        items: [
            { icon: <Briefcase weight="fill" />, label: 'Analista Field Service - 2022-Atual', type: 'info' },
        ]
    },
    {
        id: 'languages',
        title: 'Idiomas',
        icon: <Globe weight="fill" />,
        items: [
            { icon: <Globe weight="fill" />, label: 'Português - Nativo', type: 'info' },
            { icon: <Globe weight="fill" />, label: 'Inglês - Intermediário', type: 'info' },
            { icon: <Globe weight="fill" />, label: 'Espanhol - Básico', type: 'info' },
        ]
    },
    {
        id: 'certifications',
        title: 'Certificações',
        icon: <Calendar weight="fill" />,
        items: [
            { icon: <Code weight="fill" />, label: 'C# Com foco em Backend', type: 'link', url: '#' },
            { icon: <Code weight="fill" />, label: 'Javascript Com Foco em Backend', type: 'link', url: '#' },
            { icon: <Code weight="fill" />, label: 'HTML e CSS', type: 'link', url: '#' },
            { icon: <Database weight="fill" />, label: 'SQL com MySQL', type: 'link', url: '#' },
            { icon: <Database weight="fill" />, label: 'Git e GitHub', type: 'link', url: '#' },
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
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [tooltipTimeoutId, setTooltipTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleButtonClick = (buttonType: string) => {
        if (tooltipTimeoutId) {
            clearTimeout(tooltipTimeoutId);
        }

        setActiveTooltip(buttonType);

        // Auto-hide tooltip after 8 seconds
        const timeoutId = setTimeout(() => {
            setActiveTooltip(null);
        }, 8000);

        setTooltipTimeoutId(timeoutId);
    };

    const handleTooltipClose = () => {
        if (tooltipTimeoutId) {
            clearTimeout(tooltipTimeoutId);
            setTooltipTimeoutId(null);
        }
        setActiveTooltip(null);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (tooltipTimeoutId) {
                clearTimeout(tooltipTimeoutId);
            }
        };
    }, [tooltipTimeoutId]);

    // Tooltip messages for each button
    const tooltipMessages = {
        minimize: "Ops! Não dá para me minimizar, estou sempre aqui! 😄",
        maximize: "Já estou no meu tamanho máximo de fofura! 🤗",
        close: "Você achou que poderia me fechar mesmo? 😂"
    };

    // Clippy icons for each button
    const clippyIcons = {
        minimize: "📎",
        maximize: "📎",
        close: "📎"
    };

    return (
        <div className={styles.sectionContainer}>


            <div
                className={styles.profileSection}
                ref={profileRef}
            >
                <div className={styles.profileContent}>
                    {/* Barra de título Windows 7 */}
                    <div className={styles.titleBar}>
                        <div className={styles.titleBarIcon}></div>
                        <div className={styles.titleBarText}>Perfil - Ivo Netto</div>
                    </div>

                    {/* Botões de controle de janela */}
                    <div className={styles.windowControls}>
                        <button
                            className={`${styles.windowButton} ${styles.minimizeButton}`}
                            aria-label="Minimizar"
                            onClick={() => handleButtonClick('minimize')}
                        ></button>
                        <button
                            className={`${styles.windowButton} ${styles.maximizeButton}`}
                            aria-label="Maximizar"
                            onClick={() => handleButtonClick('maximize')}
                        ></button>
                        <button
                            className={`${styles.windowButton} ${styles.closeButton}`}
                            aria-label="Fechar"
                            onClick={() => handleButtonClick('close')}
                        ></button>

                        {/* Clippy Tooltip */}
                        {activeTooltip && (
                            <div
                                className={styles.clippyTooltip}
                                data-tooltip={activeTooltip}
                                role="tooltip"
                            >
                                <div className={styles.clippyAvatar}>
                                    <div className={styles.clippyBody}>
                                        {clippyIcons[activeTooltip as keyof typeof clippyIcons]}
                                    </div>
                                    <div className={styles.clippyEyes}>
                                        <div className={styles.clippyEye}></div>
                                        <div className={styles.clippyEye}></div>
                                    </div>
                                </div>
                                <div className={styles.clippyBubble}>
                                    <div className={styles.clippyMessage}>
                                        {tooltipMessages[activeTooltip as keyof typeof tooltipMessages]}
                                    </div>
                                    <button
                                        className={styles.clippyCloseButton}
                                        onClick={handleTooltipClose}
                                        aria-label="Fechar tooltip"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        )}
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
        </div>
    );
};

export default Profile;
