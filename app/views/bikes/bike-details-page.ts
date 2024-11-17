import { NavigatedData, Page } from '@nativescript/core';
import { BikeService } from '../../services/bike.service';
import { store } from '../../store';

const bikeService = new BikeService();

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const bikeId = args.context.bikeId;
    
    // TODO: Fetch actual bike details
    page.bindingContext = {
        bikeImage: "~/assets/bike-placeholder.png",
        bikeName: "Premium E-Bike",
        batteryLevel: 85,
        bikeLocation: "123 Main St, San Francisco",
        pricingDetails: "$0.15 per minute + $1 unlock fee",
        isAvailable: true,
        bikeId
    };
}

export async function onStartRideTap(args: any) {
    const page = (<any>args.object).page;
    const context = page.bindingContext;
    
    try {
        const success = await bikeService.startRide(context.bikeId);
        if (success) {
            page.frame.navigate({
                moduleName: 'views/rides/active-ride-page',
                clearHistory: true
            });
        } else {
            // TODO: Show error message
        }
    } catch (error) {
        console.error('Failed to start ride:', error);
        // TODO: Show error message
    }
}