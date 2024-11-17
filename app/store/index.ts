import { Observable } from '@nativescript/core';

export interface AppState {
  isAuthenticated: boolean;
  user: any;
  currentRide: any;
  wallet: {
    balance: number;
  };
}

class Store extends Observable {
  private state: AppState = {
    isAuthenticated: false,
    user: null,
    currentRide: null,
    wallet: {
      balance: 0
    }
  };

  getState(): AppState {
    return this.state;
  }

  setState(newState: Partial<AppState>) {
    this.state = { ...this.state, ...newState };
    this.notifyPropertyChange('state', this.state);
  }
}

export const store = new Store();

export function initializeStore() {
  // Initialize store with saved state if any
  // TODO: Implement persistence
}