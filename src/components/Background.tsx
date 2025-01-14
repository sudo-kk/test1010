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
    overflow: hidden;
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
    const lastScrollY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const colors = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#45B7D1'];
        const isMobile = window.innerWidth < 768;
        const numberOfParticles = isMobile ? 100 : 250;
        const glowRadius = isMobile ? 100 : 150;
        const attractRadius = isMobile ? 150 : 200;
        const attractStrength = isMobile ? 0.03 : 0.05;
        const maxSpeed = isMobile ? 1.5 : 2;
        const glowIntensity = isMobile ? 0.6 : 0.8;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        const createParticles = () => {
            particles.current = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const particle: Particle = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    baseRadius: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.8,
                    speedY: (Math.random() - 0.5) * 0.8,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    alpha: Math.random() * 0.4 + 0.2,
                    originalSpeedX: (Math.random() - 0.5) * 0.8,
                    originalSpeedY: (Math.random() - 0.5) * 0.8
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
                        const scale = maxSpeed / speed;
                        particle.speedX *= scale;
                        particle.speedY *= scale;
                    }
                } else {
                    particle.speedX = particle.speedX * 0.98 + particle.originalSpeedX * 0.02;
                    particle.speedY = particle.speedY * 0.98 + particle.originalSpeedY * 0.02;
                }
            }

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Improved edge wrapping
            const viewportHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
                document.documentElement.clientHeight
            );

            if (particle.x < -50) particle.x = canvas.width + 50;
            else if (particle.x > canvas.width + 50) particle.x = -50;

            if (particle.y < scrollY - 50) particle.y = scrollY + viewportHeight + 50;
            else if (particle.y > scrollY + viewportHeight + 50) particle.y = scrollY - 50;
        };

        const animate = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach(particle => {
                updateParticlePosition(particle);

                // Only render particles within the viewport plus a small buffer
                if (particle.y >= scrollY - 100 && particle.y <= scrollY + window.innerHeight + 100) {
                    let currentRadius = particle.baseRadius;
                    let alpha = particle.alpha;

                    if (mousePosition.current.x !== undefined && mousePosition.current.y !== undefined) {
                        const dx = mousePosition.current.x - particle.x;
                        const dy = (mousePosition.current.y + scrollY) - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < glowRadius) {
                            const glow = Math.pow(1 - (distance / glowRadius), 1.5);
                            currentRadius = particle.baseRadius * (1 + glow * 3);
                            alpha = Math.min(1, particle.alpha + glow * glowIntensity);

                            const gradient = ctx.createRadialGradient(
                                particle.x, particle.y - scrollY, 0,
                                particle.x, particle.y - scrollY, currentRadius * 2.5
                            );
                            gradient.addColorStop(0, `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
                            gradient.addColorStop(0.6, `${particle.color}${Math.floor(alpha * 127).toString(16).padStart(2, '0')}`);
                            gradient.addColorStop(1, `${particle.color}00`);
                            
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y - scrollY, currentRadius * 2.5, 0, Math.PI * 2);
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
            const currentScrollY = window.scrollY || window.pageYOffset;
            const deltaY = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            if (mousePosition.current.x !== undefined && mousePosition.current.y !== undefined) {
                mousePosition.current.y += deltaY;
            }
        };

        const handleMouseLeave = () => {
            if (!isTouch.current) {
                mousePosition.current = { x: undefined, y: undefined };
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            isTouch.current = true;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mousePosition.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (isTouch.current) {
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                mousePosition.current = {
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top
                };
            }
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
        window.addEventListener('scroll', handleScroll, { passive: true });
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <BackgroundContainer>
            <Canvas ref={canvasRef} />
        </BackgroundContainer>
    );
};

export default Background; 