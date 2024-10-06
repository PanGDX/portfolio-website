import React from 'react';
import IntroPage from './components/IntroPage';
import AboutMe from './components/AboutMe';
import ContactMe from './components/Contacts';
import Timeline from './components/Timeline';
import MyProjects from './components/Projects';
import Hobbies from './components/Hobbies';
import HeroBar from './components/Hero';
// import ProjectCard from './components/Projects';

const App: React.FC = () => {
  return (
    // hero
    <>
    <HeroBar/>
    <IntroPage/>
    <AboutMe/>
    <Timeline/>
    <MyProjects/>
    <Hobbies/>
    <ContactMe/>
    </>
  );
};

export default App;