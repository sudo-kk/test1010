import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { portfolioData } from '../utils/data';
import { Container } from '../styles/StyledComponents';

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1rem 2rem 1rem;
    position: relative;
`;

const HeroContent = styled(motion.div)`
    text-align: center;
    width: 100%;
    max-width: 800px;
`;

const Title = styled(motion.h1)`
    font-size: 5rem;
    font-weight: 700;
    animation: glitch 5s infinite;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 3rem;
    }
`;

const Subtitle = styled(motion.h2)`
    font-size: 3rem;
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 1rem 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2rem;
    }
`;

const TypingText = styled(motion.p)`
    font-size: 1.2rem;
    margin: 1rem 0;
    min-height: 1.5em;
`;

const ButtonContainer = styled(motion.div)`
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const Button = styled(motion.a)`
    padding: 1rem 2rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;

    &.primary {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
    }

    &.secondary {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text};
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
        text-align: center;
    }
`;

const Hero: React.FC = () => {
    const [displayText, setDisplayText] = useState('');
    const text = portfolioData.subtitle;

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <HeroSection id="home">
            <Container>
                <HeroContent
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Title
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Creative
                    </Title>
                    <Subtitle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Developer & Designer
                    </Subtitle>
                    <TypingText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {displayText}
                    </TypingText>
                    <ButtonContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            href="#work"
                            className="primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Work
                        </Button>
                        <Button
                            href="#contact"
                            className="secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Me
                        </Button>
                    </ButtonContainer>
                </HeroContent>
            </Container>
        </HeroSection>
    );
};

export default Hero; 