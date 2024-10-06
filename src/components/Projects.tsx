import React, { useEffect, useState, useRef } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  backgroundColor: string;
  textColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, backgroundColor, textColor }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        width: '600px',
        height: '600px',
        backgroundColor: backgroundColor,
        color: textColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        margin: '2rem auto',
        transform: `translateY(${isVisible ? '0' : '100px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      }}
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>{description}</p>
    </div>
  );
};


const MyProjects = () => {
  return (
    <div></div>
  )
}

export default MyProjects;


/*
Robotics Competitions
Competitive Programming
Portfolio website
*/