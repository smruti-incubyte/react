/**
 * Theme Switcher Implementation
 * Demonstrates:
 * - useContext for global state management
 * - Custom hooks for reusable logic
 * - Proper component composition
 */

import { createContext, useContext, useState, type ReactNode } from 'react';

// =============================================================================
// Step 1: Define the theme type
// =============================================================================
export type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// =============================================================================
// Step 2: Create the context
// =============================================================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// =============================================================================
// Step 3: Create a Provider component
// =============================================================================
interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value: ThemeContextType = {
        theme,
        toggleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// =============================================================================
// Step 4: Create a custom hook to use the context
// =============================================================================
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}

// =============================================================================
// Step 5: Create a custom hook for theme styling
// =============================================================================
export function useThemeStyles() {
    const { theme } = useTheme();

    const styles = {
        light: {
            backgroundColor: '#ffffff',
            color: '#000000',
            borderColor: '#cccccc',
        },
        dark: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            borderColor: '#444444',
        },
    };

    return styles[theme];
}

// =============================================================================
// Step 6: Create UI Components
// =============================================================================

/**
 * ThemeToggleButton - Button to switch themes
 */
function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                border: '2px solid',
                borderRadius: '4px',
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#333333',
                color: theme === 'light' ? '#000000' : '#ffffff',
                borderColor: theme === 'light' ? '#cccccc' : '#555555',
                transition: 'all 0.3s ease',
            }}
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}

/**
 * ThemeDisplay - Shows current theme
 */
function ThemeDisplay() {
    const { theme } = useTheme();

    return (
        <div
            style={{
                padding: '20px',
                marginTop: '20px',
                backgroundColor: theme === 'light' ? '#f5f5f5' : '#2a2a2a',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                <span style={{ color: theme === 'light' ? '#0066cc' : '#66ccff' }}>
                    {`Current Theme: ${theme.toUpperCase()}`}
                </span>
            </p>
        </div>
    );
}

/**
 * ThemeCard - A component that adapts to theme
 */
interface ThemeCardProps {
    title: string;
    description: string;
}

function ThemeCard({ title, description }: ThemeCardProps) {
    const styles = useThemeStyles();

    return (
        <div
            style={{
                ...styles,
                padding: '20px',
                marginTop: '15px',
                borderRadius: '8px',
                border: `2px solid ${styles.borderColor}`,
                transition: 'all 0.3s ease',
            }}
        >
            <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>{description}</p>
        </div>
    );
}

/**
 * ThemedContent - Main content area that adapts to theme
 */
function ThemedContent() {
    const { theme } = useTheme();

    return (
        <div
            style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
                color: theme === 'light' ? '#000000' : '#ffffff',
                padding: '20px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
            }}
        >
            <h2>Theme-Aware Content</h2>
            <p>
                This content adapts to the current theme. The styles change automatically
                when you toggle the theme using the button above.
            </p>
            <ThemeCard
                title="Feature 1"
                description="This card demonstrates how components using the useThemeStyles hook adapt to theme changes."
            />
            <ThemeCard
                title="Feature 2"
                description="Each component can independently access theme context without prop drilling."
            />
        </div>
    );
}

/**
 * Header - Component that uses theme context
 */
function Header() {
    const { theme } = useTheme();

    return (
        <header
            style={{
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#2a2a2a',
                color: theme === 'light' ? '#000000' : '#ffffff',
                padding: '20px',
                borderBottom: `2px solid ${theme === 'light' ? '#cccccc' : '#444444'}`,
                marginBottom: '20px',
            }}
        >
            <h1 style={{ margin: 0 }}>Theme Switcher Demo</h1>
            <p style={{ margin: '5px 0 0 0', opacity: 0.7 }}>
                Using useContext + Custom Hooks
            </p>
        </header>
    );
}

/**
 * Main ThemeSwitcher component - demonstrates proper composition
 */
export function ThemeSwitcher() {
    return (
        <ThemeProvider initialTheme={'dark'}>
            <div
                style={{
                    minHeight: '100vh',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                }}
            >
                <Header />
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <ThemeToggleButton />
                    <ThemeDisplay />
                    <ThemedContent />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default ThemeSwitcher;
