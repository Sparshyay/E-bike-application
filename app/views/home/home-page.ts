import { NavigatedData, Page, Observable } from '@nativescript/core';
import { BikeService } from '../../services/bike.service';
import { Geolocation } from '@nativescript/geolocation';
import { store } from '../../store';

const bikeService = new BikeService();

class HomeViewModel extends Observable {
    userLocation = {
        latitude: 37.7749,
        longitude: -122.4194
    };
    bikes = [];
    isLoading = false;
}

let viewModel: HomeViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    if (!viewModel) {
        viewModel = new HomeViewModel();
    }
    
    page.bindingContext = viewModel;
    getCurrentLocation();
}

export function onMapReady(args: any) {
    const mapView = args.object;
    loadNearbyBikes(mapView);
}

async function getCurrentLocation() {
    try {
        const location = await Geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            maximumAge: 5000,
            timeout: 10000
        });
        
        viewModel.set('userLocation', {
            latitude: location.latitude,
            longitude: location.longitude
        });
    } catch (error) {
        console.error('Error getting location:', error);
    }
}

async function loadNearbyBikes(mapView: any) {
    try {
        viewModel.set('isLoading', true);
        const { latitude, longitude } = viewModel.userLocation;
        const bikes = await bikeService.getNearbyBikes(latitude, longitude);
        
        // Add markers for each bike
        bikes.forEach(bike => {
            mapView.addMarker({
                latitude: bike.location.latitude,
                longitude: bike.location.longitude,
                title: `E-Bike (${bike.batteryLevel}%)`,
                snippet: bike.isAvailable ? 'Available' : 'In use',
                onTap: () => onBikeMarkerTap(bike)
            });
        });
        
        viewModel.set('bikes', bikes);
    } catch (error) {
        console.error('Error loading bikes:', error);
    } finally {
        viewModel.set('isLoading', false);
    }
}

function onBikeMarkerTap(bike: any) {
    const frame = viewModel.page.frame;
    frame.navigate({
        moduleName: 'views/bikes/bike-details-page',
        context: { bikeId: bike.id }
    });
}

export function onRefreshTap() {
    getCurrentLocation();
    const mapView = viewModel.page.getViewById('map');
    if (mapView) {
        loadNearbyBikes(mapView);
    }
}

export function onHomeTab() {
    // Already on home
}

export function onBikesTab() {
    const frame = viewModel.page.frame;
    frame.navigate('views/bikes/bikes-list-page');
}

export function onWalletTab() {
    const frame = viewModel.page.frame;
    frame.navigate('views/wallet/wallet-page');
}

export function onProfileTab() {
    const frame = viewModel.page.frame;
    frame.navigate('views/profile/profile-page');
}