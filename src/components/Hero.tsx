import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../styles/StyledComponents';

const HeroSection = styled.section`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 0 2rem 0;
    position: relative;
    overflow: hidden;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0;
        min-height: 100vh;
        height: auto;
        align-items: flex-start;
    }
`;

const StyledContainer = styled(Container)`
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 0;
        min-height: 100vh;
        height: auto;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }
`;

const HeroContent = styled(motion.div)`
    text-align: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1rem;
        min-height: 100vh;
        height: auto;
        justify-content: flex-start;
        margin: 0;
        padding-top: 5rem;
    }
`;

const Title = styled(motion.h1)`
    font-size: 5rem;
    font-weight: 700;
    animation: glitch 5s infinite;
    margin: 0 0 1rem 0;
    padding: 0;
    width: 100%;
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 2.5rem;
        line-height: 1.2;
        margin: 0 0 0.75rem 0;
        white-space: normal;
        padding: 0 0.5rem;
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
    margin: 0 0 1rem 0;
    padding: 0;
    width: 100%;
    white-space: nowrap;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.5rem;
        line-height: 1.3;
        margin: 0 0 0.75rem 0;
        white-space: normal;
        padding: 0 0.5rem;
    }
`;

const TypingText = styled(motion.p)`
    font-size: 1.2rem;
    margin: 1rem 0;
    min-height: 1.5em;
    width: 100%;
    max-width: 90%;
    padding: 0;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1rem;
        line-height: 1.4;
        margin: 0.75rem 0;
        padding: 0 1rem;
        min-height: 3em;
        max-width: 100%;
    }
`;

const ButtonContainer = styled(motion.div)`
    margin-top: 2rem;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    width: 100%;
    padding: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        margin-top: 1.5rem;
        padding: 0 1.5rem;
        margin-bottom: 2rem;
    }
`;

const Button = styled(motion.a)`
    padding: 0.875rem 2rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    font-size: 1rem;

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
        max-width: 250px;
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
        min-width: unset;
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