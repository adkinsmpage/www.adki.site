// @/lib/state.js
import { proxy, subscribe } from 'valtio';

// 类型定义（如使用TypeScript）
// interface ThemeState {
//   mode: 'light' | 'dark' | 'system'
//   systemPreference: 'light' | 'dark'
// }

export const uiState = proxy({
    theme: {
        mode: 'system',
        systemPreference: 'light'
    }
});

// 状态持久化逻辑
const STORAGE_KEY = 'app_ui_state';

// 初始化时加载本地存储
if (typeof localStorage !== 'undefined') {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    Object.assign(uiState.theme, saved.theme);
}

// 订阅状态变化
subscribe(uiState, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        theme: uiState.theme
    }));
});
