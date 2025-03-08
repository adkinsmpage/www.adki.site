// @/components/ThemeToggle.jsx
import { useSnapshot } from 'valtio';
import { uiState, ThemeService } from '@/lib/state';

export const ThemeToggle = () => {
  const { theme } = useSnapshot(uiState);
  
  return (
    <div className="theme-switcher">
      <button 
        onClick={() => ThemeService.setTheme('light')}
        data-active={theme.mode === 'light'}
      >
        ☀️
      </button>
      <button
        onClick={() => ThemeService.setTheme('dark')}
        data-active={theme.mode === 'dark'}
      >
        🌙
      </button>
      <button
        onClick={() => ThemeService.setTheme('system')}
        data-active={theme.mode === 'system'}
      >
        💻
      </button>
    </div>
  );
};
