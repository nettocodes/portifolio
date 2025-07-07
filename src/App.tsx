import React from 'react';
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

const App: React.FC = () => (
  <>
    <Header />
    <SectionWrapper id="hero">
      <Hero />
    </SectionWrapper>
    <SectionWrapper id="about">
      <About />
    </SectionWrapper>
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
  </>
);

export default App;
