import { NavigatedData, Page, Observable } from '@nativescript/core';
import { BikeService } from '../../services/bike.service';
import { Geolocation } from '@nativescript/geolocation';

const bikeService = new BikeService();

class BikesListViewModel extends Observable {
    bikes = [];
    isLoading = false;
}

let viewModel: BikesListViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    if (!viewModel) {
        viewModel = new BikesListViewModel();
    }
    
    page.bindingContext = viewModel;
    loadBikes();
}

async function loadBikes() {
    try {
        viewModel.set('isLoading', true);
        const location = await Geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            maximumAge: 5000,
            timeout: 10000
        });
        
        const bikes = await bikeService.getNearbyBikes(
            location.latitude,
            location.longitude
        );
        
        viewModel.set('bikes', bikes.map(bike => ({
            ...bike,
            distance: calculateDistance(
                location.latitude,
                location.longitude,
                bike.location.latitude,
                bike.location.longitude
            )
        })));
    } catch (error) {
        console.error('Error loading bikes:', error);
    } finally {
        viewModel.set('isLoading', false);
    }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Simple distance calculation - can be improved with actual geodesic distance
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

export function onBikeTap(args: any) {
    const bike = viewModel.bikes[args.index];
    const frame = args.object.page.frame;
    frame.navigate({
        moduleName: 'views/bikes/bike-details-page',
        context: { bikeId: bike.id }
    });
}