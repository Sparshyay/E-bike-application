import { Observable } from '@nativescript/core';
import { store } from '../store';

export class AuthService extends Observable {
  async login(email: string, password: string): Promise<boolean> {
    try {
      // TODO: Implement actual API call
      const mockUser = { id: 1, email, name: 'Test User' };
      store.setState({ 
        isAuthenticated: true,
        user: mockUser
      });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    store.setState({
      isAuthenticated: false,
      user: null,
      currentRide: null
    });
  }
}