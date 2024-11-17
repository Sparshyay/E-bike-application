import { Application } from '@nativescript/core';
import { initializeStore } from './store';
import { Geolocation } from '@nativescript/geolocation';

// Request location permissions
Geolocation.enableLocationRequest()
    .then(() => {
        console.log('Location enabled');
    })
    .catch((error) => {
        console.error('Error enabling location:', error);
    });

// Initialize the global state store
initializeStore();

Application.run({ moduleName: 'app-root' });