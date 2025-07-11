import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import './reset.css';
import './styles/global.scss';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Contact from './sections/Contact/Contact';
import SectionWrapper from './components/SectionWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile';
import ContactFloating from './components/ContactFloating';
import styles from './App.module.scss';

const App: React.FC = () => (
  <>
    <Header />
    <SectionWrapper id="hero">
      <Hero />
    </SectionWrapper>
    <div className={styles.profileContainer}>
      <Profile />
    </div>
    <SectionWrapper id="about">
      <About />
    </SectionWrapper>
    <div className={styles.contactContainer}>
      <ContactFloating />
    </div>
    <SectionWrapper id="projects">
      <Projects />
    </SectionWrapper>
    <SectionWrapper id="skills">
      <Skills />
    </SectionWrapper>
    <SectionWrapper id="contact">
      <Contact />
    </SectionWrapper>
    <Footer />
    <Analytics />
  </>
);

export default App;
