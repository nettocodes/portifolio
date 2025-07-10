import React, { memo, useRef, useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import ivoImg from '../assets/ivo.jpg';
import {
  Calendar,
  FolderOpen,
  Coffee,
  MusicNote,
  Camera,
  Airplane,
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

const hobbies = [
  { icon: <MusicNote weight="fill" />, label: 'Música' },
  { icon: <Camera weight="fill" />, label: 'Fotografia' },
  { icon: <Airplane weight="fill" />, label: 'Viagens' },
  { icon: <Coffee weight="fill" />, label: 'Café' },
  { icon: <MusicNote weight="fill" />, label: 'Arte' },
  { icon: <Camera weight="fill" />, label: 'Natureza' },
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

const HobbiesMarquee = memo(({ isMobile }: { isMobile: boolean }) => {
  // Reduzir repetições em mobile para melhor performance
  const repetitions = isMobile ? 3 : 4;
  const extendedHobbies = Array(repetitions).fill(hobbies).flat();
  
  return (
    <div className={styles.hobbiesContainer}>
      <div className={styles.hobbiesMarquee}>
        {extendedHobbies.map((hobby, index) => (
          <div key={`hobby-${index}`} className={styles.hobbyItem}>
            <div className={styles.hobbyIcon}>{hobby.icon}</div>
            <span>{hobby.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const Profile: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Hook para detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className={styles.profile} ref={profileRef}>
      <div className={styles.profileContent}>
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
          <HobbiesMarquee isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
