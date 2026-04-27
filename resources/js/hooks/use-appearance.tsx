import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const APPEARANCE_KEY = 'appearance';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    const isDark =
        appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = (): Appearance | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        return localStorage.getItem(APPEARANCE_KEY) as Appearance | null;
    } catch {
        return null;
    }
};

const setStoredAppearance = (mode: Appearance) => {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(APPEARANCE_KEY, mode);
    } catch {
        // Ignore storage failures (e.g. strict privacy modes).
    }
};

const addMediaQueryListener = (
    mql: MediaQueryList,
    listener: (event: MediaQueryListEvent) => void,
) => {
    if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', listener);
        return;
    }

    mql.addListener(listener);
};

const removeMediaQueryListener = (
    mql: MediaQueryList,
    listener: (event: MediaQueryListEvent) => void,
) => {
    if (typeof mql.removeEventListener === 'function') {
        mql.removeEventListener('change', listener);
        return;
    }

    mql.removeListener(listener);
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    const savedAppearance = getStoredAppearance() || 'system';

    applyTheme(savedAppearance);

    const mql = mediaQuery();
    if (mql) {
        addMediaQueryListener(mql, handleSystemThemeChange);
    }
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        // Store in localStorage for client-side persistence...
        setStoredAppearance(mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = getStoredAppearance();
        updateAppearance(savedAppearance || 'system');

        const mql = mediaQuery();
        if (!mql) {
            return;
        }

        addMediaQueryListener(mql, handleSystemThemeChange);

        return () => removeMediaQueryListener(mql, handleSystemThemeChange);
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
