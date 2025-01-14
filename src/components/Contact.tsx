import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, GlassCard } from '../styles/StyledComponents';

const ContactSection = styled.section`
    padding: 5rem 0;
    position: relative;
`;

const SectionTitle = styled(motion.h2)`
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
`;

const ContactContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
        grid-template-columns: 3fr 2fr;
    }
`;

const ContactForm = styled(GlassCard)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        background: rgba(255, 255, 255, 0.15);
    }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
    min-height: 150px;
    resize: vertical;
`;

const SubmitButton = styled(motion.button)`
    padding: 1rem 2rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ContactInfo = styled(GlassCard)`
    h3 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
`;

const InfoItem = styled.div`
    margin-bottom: 1.5rem;

    .label {
        font-size: 0.9rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
    }

    .value {
        font-size: 1.1rem;
        font-weight: 500;
    }
`;

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        setIsSubmitting(false);
        alert('Message sent successfully!');
    };

    return (
        <ContactSection id="contact">
            <Container>
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Let's Connect
                </SectionTitle>
                <ContactContainer>
                    <ContactForm
                        as={motion.form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextArea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                        <SubmitButton
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </SubmitButton>
                    </ContactForm>
                    <ContactInfo
                        as={motion.div}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>Contact Information</h3>
                        <InfoItem>
                            <div className="label">Email</div>
                            <div className="value">hello@example.com</div>
                        </InfoItem>
                        <InfoItem>
                            <div className="label">Location</div>
                            <div className="value">New York, USA</div>
                        </InfoItem>
                    </ContactInfo>
                </ContactContainer>
            </Container>
        </ContactSection>
    );
};

export default Contact; 