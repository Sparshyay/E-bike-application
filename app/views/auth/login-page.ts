import { NavigatedData, Page, EventData } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

const authService = new AuthService();

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = {
        email: '',
        password: '',
        isLoading: false
    };
}

export async function onLoginTap(args: EventData) {
    const page = (<any>args.object).page;
    const bindingContext = page.bindingContext;
    
    if (!bindingContext.email || !bindingContext.password) {
        // TODO: Show validation error
        return;
    }

    bindingContext.isLoading = true;
    
    try {
        const success = await authService.login(
            bindingContext.email,
            bindingContext.password
        );
        
        if (success) {
            page.frame.navigate({
                moduleName: 'views/home/home-page',
                clearHistory: true
            });
        } else {
            // TODO: Show error message
        }
    } catch (error) {
        console.error('Login error:', error);
        // TODO: Show error message
    } finally {
        bindingContext.isLoading = false;
    }
}

export function onForgotPasswordTap() {
    // TODO: Implement forgot password flow
}