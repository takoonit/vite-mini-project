import axios from 'axios';
import MapConfigs from '../configs/MapConfigs.tsx';

const MAPQUEST_API_KEY = MapConfigs.MAP_API

export interface Route {
    distance: number;
    duration: number;
    directions: string[];
    fuelUsed?: number;
    legs?: any[];
}

interface Location {
    place_id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export const getAlternateRoutes = async (startLocation: Location, endLocation: Location): Promise<Route[]> => {
    try {
        const response = await axios.get(
            `https://www.mapquestapi.com/directions/v2/alternateroutes?key=${MAPQUEST_API_KEY}&from=${startLocation.latitude},${startLocation.longitude}&to=${endLocation.latitude},${endLocation.longitude}&maxRoutes=3&unit=k`
        );
        console.log('Response:', response.data);

        const {route} = response.data;
        console.log('Route:', route);
        const parsedRoutes = [{
            distance: route.distance,
            duration: route.formattedTime,
            fuelUsed: route.fuelUsed,
            legs: route.legs.map((leg: any) => leg),
        }];
        console.log('Parsed Routes:', parsedRoutes);
        console.log('Alternate Routes:', route.alternateRoutes);
        const alternateRoutes = route.alternateRoutes?.map((r: any) => ({
            distance: r.route.distance,
            duration: r.route.formattedTime,
            fuelUsed: r.route.fuelUsed,
            legs: r?.route?.legs?.map((leg: any) => leg),
        }));
        return [...parsedRoutes,...(alternateRoutes || [])];
    } catch (error) {
        console.log('Error:', error);
        return [];
    }
}
export const getOptimizedRoute = async (startLocation: string, endLocation: string): Promise<Route | null> => {
    try {
        const response = await axios.get('http://www.mapquestapi.com/directions/v2/optimizedroute', {
            params: {
                key: MAPQUEST_API_KEY,
                from: startLocation,
                to: endLocation,
            },
        });

        const {distance, time, legs} = response.data.route;
        const directions = legs.map((leg: any) => leg.narrative);

        const route: Route = {
            distance: distance,
            duration: time,
            directions: directions,
        };

        return route;
    } catch (error) {
        console.error('Error retrieving optimized route:', error);
        return null;
    }
};
