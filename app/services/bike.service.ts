import { Observable } from '@nativescript/core';
import { store } from '../store';

export interface Bike {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  batteryLevel: number;
  isAvailable: boolean;
}

export class BikeService extends Observable {
  async getNearbyBikes(latitude: number, longitude: number): Promise<Bike[]> {
    // TODO: Implement actual API call
    return [
      {
        id: '1',
        location: { latitude: latitude + 0.001, longitude: longitude + 0.001 },
        batteryLevel: 85,
        isAvailable: true
      }
    ];
  }

  async startRide(bikeId: string): Promise<boolean> {
    try {
      // TODO: Implement actual API call
      store.setState({
        currentRide: {
          bikeId,
          startTime: new Date(),
          status: 'active'
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to start ride:', error);
      return false;
    }
  }

  async endRide(): Promise<boolean> {
    try {
      // TODO: Implement actual API call
      store.setState({ currentRide: null });
      return true;
    } catch (error) {
      console.error('Failed to end ride:', error);
      return false;
    }
  }
}