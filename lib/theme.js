// @/lib/theme.js
'use client'

import { uiState } from '@/lib/state';

export const ThemeService = {
  // 获取当前有效主题
  get effectiveTheme() {
    return uiState.theme.mode === 'system' 
      ? uiState.theme.systemPreference
      : uiState.theme.mode
  },

  // 切换主题方法
  setTheme(mode) {
    uiState.theme.mode = mode;
    this.applyThemeToDOM();
  },

  // 应用主题到页面
  applyThemeToDOM() {
    const theme = this.effectiveTheme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  },

  // 初始化系统偏好监听
  initSystemListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e) => {
      uiState.theme.systemPreference = e.matches ? 'dark' : 'light';
      this.applyThemeToDOM();
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }
};
