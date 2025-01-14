import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/StyledComponents';

const HeroSection = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 60px; // Height of navbar

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding-top: 60px;
        height: calc(100vh - 60px);
        overflow-y: auto;
    }
`;

const StyledContainer = styled(Container)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 16px;
        justify-content: flex-start;
    }
`;

const HeroContent = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    gap: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 0.75rem;
        margin-top: 2vh;
    }
`;

const Title = styled(motion.h1)`
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 700;
    animation: glitch 5s infinite;
    margin: 0;
    padding: 0;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        line-height: 1.2;
        padding: 0 8px;
    }
`;

const Subtitle = styled(motion.h2)`
    font-size: clamp(1.5rem, 5vw, 3rem);
    background: linear-gradient(45deg, 
        ${({ theme }) => theme.colors.primary}, 
        ${({ theme }) => theme.colors.secondary}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    padding: 0;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        line-height: 1.3;
        padding: 0 8px;
    }
`;

const TypingText = styled(motion.p)`
    font-size: clamp(0.875rem, 3vw, 1.2rem);
    line-height: 1.5;
    margin: 0;
    padding: 0 16px;
    min-height: 3em;
    width: 100%;
    max-width: 90%;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        max-width: 100%;
        padding: 0 12px;
    }
`;

const ButtonContainer = styled(motion.div)`
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    width: 100%;
    padding: 0;
    margin-top: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 0 24px;
        margin-top: 2vh;
    }
`;

const Button = styled(motion.a)`
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 140px;
    font-size: clamp(0.875rem, 2vw, 1rem);

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
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(108, 99, 255, 0.2);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: 100%;
        max-width: 200px;
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
        "There's a new cyber attack every 39 seconds",
        "Cyberattacks are increasing globally, affecting individuals and organizations.",
        "Phishing tricks people into revealing sensitive personal information.",
        "Strong passwords and 2FA improve online account security.",
        "Public Wi-Fi risks hacking and data theft vulnerabilities.",
        "Software updates fix security flaws to block threats.",
        "Social engineering manipulates victims to access confidential data.",
        "Ransomware locks data, demanding payment for decryption keys.",
        "Data breaches expose sensitive information, risking identity theft.",
        "Did you know 90% of cyberattacks start with phishing?",
        "Can you imagine how quickly your data can be stolen online?",
        "What if your personal data is already on the dark web?",
        "Have you ever wondered who’s watching your online activity?",
        "Did you know hackers can breach your device through Wi-Fi?",
        "Could a simple email cost you millions in damages?",
        "What if your smartphone has been compromised without you knowing?",
        "Do you realize how vulnerable your online accounts truly are?"

    ];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 30;
    const deletingSpeed = 5;
    const pauseTime = 2000;

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        
        const animateText = () => {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (!isDeleting) {
                if (displayText !== currentPhrase) {
                    timeout = setTimeout(() => {
                        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                    }, typingSpeed);
                } else {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseTime);
                }
            } else {
                if (displayText === '') {
                    setIsDeleting(false);
                    let nextIndex;
                    do {
                        nextIndex = Math.floor(Math.random() * phrases.length);
                    } while (nextIndex === currentPhraseIndex);
                    setCurrentPhraseIndex(nextIndex);
                } else {
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
            <StyledContainer>
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
                        sudo_kk
                    </Title>
                    <Subtitle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Techie & Cyber Expert
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
                            Let's Connect
                        </Button>
                    </ButtonContainer>
                </HeroContent>
            </StyledContainer>
        </HeroSection>
    );
};

export default Hero; 