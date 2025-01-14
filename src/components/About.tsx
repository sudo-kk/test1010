import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, GlassCard } from '../styles/StyledComponents';

const AboutSection = styled.section`
    padding: 5rem 0;
    position: relative;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
`;

const AboutContent = styled(GlassCard)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const AboutText = styled.div`
    h3 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        background: linear-gradient(45deg, 
            ${({ theme }) => theme.colors.primary}, 
            ${({ theme }) => theme.colors.secondary}
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    p {
        font-size: 1.1rem;
        line-height: 1.8;
        margin-bottom: 1.5rem;
        opacity: 0.9;
    }
`;

const TechStack = styled.div`
    margin-top: 2rem;
    
    h4 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: ${({ theme }) => theme.colors.primary};
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .tech-item {
        background: ${({ theme }) => `${theme.colors.primary}15`};
        padding: 0.5rem 1rem;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
        transition: all 0.3s ease;

        &:hover {
            background: ${({ theme }) => `${theme.colors.primary}30`};
            transform: translateY(-2px);
        }
    }
`;

const About: React.FC = () => {
    const techStack = [
        'JavaScript', 'Kotlin', 'HTML5', 'Python', 'React', 'Node.js',
        'Flutter', 'OpenCV', 'MongoDB', 'TensorFlow', 'Docker', 'AWS',
        'Azure', 'Cloudflare', 'Vercel', 'GitHub'
    ];

    return (
        <AboutSection id="about">
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </SectionTitle>
                <AboutContent
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <AboutText>
                        <h3>Student Coder & Cybersecurity Enthusiast</h3>
                        <p>
                            Hi there! I'm Karthik V K, a passionate student coder and cybersecurity enthusiast. 
                            I create projects like phishing awareness tools and a plant disease identification website.
                        </p>
                        <p>
                            Currently in Class 12 at Bharatiya Vidya Bhavan, graduating in 2025. I'm deeply interested
                            in exploring technology and cybersecurity to make the digital world safer.
                        </p>
                        <p>
                            My projects combine creativity with technical skills, focusing on real-world applications
                            that can make a difference. Whether it's developing security tools or working on AI-powered
                            plant disease detection, I'm always eager to learn and innovate.
                        </p>
                    </AboutText>
                    <TechStack>
                        <h4>Tech Stack</h4>
                        <div className="tech-grid">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    className="tech-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {tech}
                                </motion.div>
                            ))}
                        </div>
                    </TechStack>
                </AboutContent>
            </Container>
        </AboutSection>
    );
};

export default About; 