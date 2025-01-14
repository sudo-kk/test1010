import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
`;

interface Particle {
    x: number;
    y: number;
    radius: number;
    baseRadius: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;
    originalSpeedX: number;
    originalSpeedY: number;
}

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mousePosition = useRef({ x: undefined as number | undefined, y: undefined as number | undefined });
    const animationFrameId = useRef<number>();
    const isTouch = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const colors = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#45B7D1'];
        const numberOfParticles = window.innerWidth < 768 ? 150 : 300;
        const glowRadius = 150;
        const attractRadius = 200;
        const attractStrength = 0.05;
        const maxSpeed = 2;
        const glowIntensity = 0.8;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles.current = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const particle: Particle = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    baseRadius: Math.random() * 2 + 1,
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.5 + 0.2,
                    originalSpeedX: Math.random() * 1 - 0.5,
                    originalSpeedY: Math.random() * 1 - 0.5
                };
                particles.current.push(particle);
            }
        };

        const updateParticlePosition = (particle: Particle) => {
            const scrollY = window.scrollY || window.pageYOffset;
            
            if (mousePosition.current.x !== undefined && mousePosition.current.y !== undefined) {
                const dx = mousePosition.current.x - particle.x;
                const dy = (mousePosition.current.y + scrollY) - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < attractRadius) {
                    const force = (1 - distance / attractRadius) * attractStrength;
                    particle.speedX += (dx / distance) * force;
                    particle.speedY += (dy / distance) * force;

                    const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                    if (speed > maxSpeed) {
                        particle.speedX = (particle.speedX / speed) * maxSpeed;
                        particle.speedY = (particle.speedY / speed) * maxSpeed;
                    }
                } else {
                    particle.speedX = particle.speedX * 0.95 + particle.originalSpeedX * 0.05;
                    particle.speedY = particle.speedY * 0.95 + particle.originalSpeedY * 0.05;
                }
            } else {
                particle.speedX = particle.speedX * 0.95 + particle.originalSpeedX * 0.05;
                particle.speedY = particle.speedY * 0.95 + particle.originalSpeedY * 0.05;
            }

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges with scroll offset consideration
            const margin = 50;
            if (particle.x < -margin) particle.x = canvas.width + margin;
            else if (particle.x > canvas.width + margin) particle.x = -margin;
            
            const totalHeight = canvas.height + scrollY;
            if (particle.y < scrollY - margin) particle.y = totalHeight + margin;
            else if (particle.y > totalHeight + margin) particle.y = scrollY - margin;
        };

        const animate = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach(particle => {
                let currentRadius = particle.baseRadius;
                let alpha = particle.alpha;

                updateParticlePosition(particle);

                // Only render particles that are within the viewport
                if (particle.y >= scrollY - 100 && particle.y <= scrollY + window.innerHeight + 100) {
                    if (mousePosition.current.x !== undefined && mousePosition.current.y !== undefined) {
                        const dx = mousePosition.current.x - particle.x;
                        const dy = (mousePosition.current.y + scrollY) - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < glowRadius) {
                            const glow = 1 - (distance / glowRadius);
                            currentRadius = particle.baseRadius * (1 + glow * 4);
                            alpha = Math.min(1, particle.alpha + glow * glowIntensity);

                            const gradient = ctx.createRadialGradient(
                                particle.x, particle.y - scrollY, 0,
                                particle.x, particle.y - scrollY, currentRadius * 3
                            );
                            gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
                            gradient.addColorStop(0.5, `${particle.color}${Math.floor(alpha * 127).toString(16).padStart(2, '0')}`);
                            gradient.addColorStop(1, `${particle.color}00`);
                            
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y - scrollY, currentRadius * 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y - scrollY, currentRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isTouch.current) {
                const rect = canvas.getBoundingClientRect();
                mousePosition.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        };

        const handleScroll = () => {
            if (mousePosition.current.x !== undefined && mousePosition.current.y !== undefined) {
                const rect = canvas.getBoundingClientRect();
                const scrollX = window.scrollX || window.pageXOffset;
                const scrollY = window.scrollY || window.pageYOffset;
                mousePosition.current = {
                    x: mousePosition.current.x - scrollX + (window.scrollX || window.pageXOffset),
                    y: mousePosition.current.y - scrollY + (window.scrollY || window.pageYOffset)
                };
            }
        };

        const handleMouseLeave = () => {
            if (!isTouch.current) {
                mousePosition.current = { x: undefined, y: undefined };
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            isTouch.current = true;
            const rect = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top + window.scrollY
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top + window.scrollY
            };
        };

        const handleTouchEnd = () => {
            setTimeout(() => {
                mousePosition.current = { x: undefined, y: undefined };
            }, 50);
        };

        // Initialize
        resizeCanvas();
        createParticles();
        animate();

        // Event listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <BackgroundContainer>
            <Canvas ref={canvasRef} />
        </BackgroundContainer>
    );
};

export default Background; 