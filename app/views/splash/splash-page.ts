import { NavigatedData, Page } from '@nativescript/core';
import { store } from '../../store';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    // Simulate initialization delay
    setTimeout(() => {
        const frame = page.frame;
        const nextPage = store.getState().isAuthenticated ? 'views/home/home-page' : 'views/auth/login-page';
        frame.navigate({
            moduleName: nextPage,
            clearHistory: true
        });
    }, 2000);
}