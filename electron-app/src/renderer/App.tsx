import React, { useEffect } from 'react';
import BaseLayout from './components/layout/BaseLayout';
import { Button } from './components/ui/button';
import { ThemeProvider } from './components/theme-provider';
import { useSettingsStore } from './stores/settings';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import LoginPage from './pages/LoginPage';

function ThemeToggleButton() {
  const { setTheme, theme } = useSettingsStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

const App: React.FC = () => {
  const { theme, _hasHydrated, isAuthenticated } = useSettingsStore();
  const { setTheme: setNextTheme } = useTheme();

  useEffect(() => {
    if (_hasHydrated) {
      setNextTheme(theme);
    }
  }, [theme, setNextTheme, _hasHydrated]);

  if (!_hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
      <BaseLayout>
        <div className="container p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Modern Electron Boilerplate</h1>
            <ThemeToggleButton />
          </div>
          <p className="text-muted-foreground">
            Welcome to your new Electron application.
          </p>
          <Button className="mt-4">Click me</Button>
        </div>
      </BaseLayout>
    </ThemeProvider>
  );
};

export default App;
