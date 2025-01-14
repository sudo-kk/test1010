import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Background />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Contact />
                </main>
            </div>
        </ThemeProvider>
    );
};

export default App;
