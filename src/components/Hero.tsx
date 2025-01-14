import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
    const phrases = [
        "Turning ideas into interactive experiences",
        "Did you know? 95% of cybersecurity breaches are due to human error",
        "The first computer virus was created in 1983",
        "The term 'bug' originated from an actual moth in a computer",
        "The average cost of a data breach is $3.86 million",
        "There's a new cyber attack every 39 seconds"
    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseTime = 2000;

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        
        const animateText = () => {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (!isDeleting) {
                if (displayText !== currentPhrase) {
                    // Typing
                    timeout = setTimeout(() => {
                        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                    }, typingSpeed);
                } else {
                    // Pause before deleting
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseTime);
                }
            } else {
                if (displayText === '') {
                    // Move to next phrase
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                } else {
                    // Deleting
                    timeout = setTimeout(() => {
                        setDisplayText(displayText.slice(0, -1));
                    }, deletingSpeed);
                }
            }
        };

        timeout = setTimeout(animateText, 50);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhraseIndex]);

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
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                            style={{ display: 'inline-block', marginLeft: '2px', borderRight: '2px solid currentColor' }}
                        >
                            &nbsp;
                        </motion.span>
                    </TypingText>
                    <ButtonContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            href="#about"
                            className="primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            About Me
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