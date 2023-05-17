import {DirectionsService, GoogleMap, useLoadScript} from '@react-google-maps/api';
import {Libraries} from '@react-google-maps/api/dist/utils/make-load-script-url';
import MapConfigs from '../configs/MapConfigs';
import {ResponsiveContainer} from 'recharts';
import LocationSearch from './LocationSearch.tsx';
import {useState} from 'react';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

const directionService = new DirectionsService();
const libraries:Libraries = ["places"];

interface MapProps {
    onLoad: (map: google.maps.Map) => void,
    onUnMount: (map: google.maps.Map) => void,
    center: {
        lat: number,
        lng: number,
    },
}

const Map: React.FC<MapProps> = ({ center, onLoad, onUnMount }) => {
    // const [location1, setLocation1] = useState<PlaceResult>(); // Default location 1
    // const [location2, setLocation2] = useState<PlaceResult>(); // Default location 2
    const containerStyle = {
        width: '100%',
        height: '100%',
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MapConfigs.REACT_APP_GOOGLE_MAPS_API_KEY || "",
        libraries: libraries,
    });
    // const handleSelect = async (location1:PlaceResult, location2: PlaceResult) => {
    //     // Get Routes (WIP)
    //     const directionsService = new window.google.maps.DirectionsService();
    //     directionsService.route(
    //         {
    //             origin: { placeId: location1.place_id },
    //             destination: { placeId: location2.place_id },
    //             travelMode: window.google.maps.TravelMode.DRIVING,
    //             provideRouteAlternatives: true,
    //             avoidTolls: false,
    //             avoidHighways: false,
    //         },
    //         (response, status) => {
    //             if (status === "OK") {
    //                 console.table(response?.available_travel_modes);
    //                 console.table(response?.routes);
    //                 // setDrivingRoutes(response.routes)
    //                 // setSelectedRoute(response.routes[0])
    //                 // setFactors((prevFactors) => ({...prevFactors, timeSpendUsingCar: Math.round(response.routes[0].legs[0].duration.value / 60) }))
    //             }
    //         }
    //     );
    //     // setIsLoading(true);
    //     // try {
    //     //     const results = await geocodeByAddress(value);
    //     //     const latLng = await getLatLng(results[0]);
    //     //     setAddress(value);
    //     //     setLocation(latLng);
    //     // } catch (error) {
    //     //     console.error('Error occurred in geocoding address: ', error);
    //     //     // You might want to set an error state here and show it to the user
    //     // } finally {
    //     //     setIsLoading(false);
    //     // }
    // };

    if (loadError) {
        return (
            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                <p className="font-bold">Error loading maps</p>
                <p className="text-sm">There was an error loading Google Maps.</p>
            </div>
        );
    }

    // if (!isLoaded  || !location1 || !location2) {
    if (!isLoaded) {
        return (
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">Loading Maps</p>
                <p className="text-sm">Maps are currently loading. Please wait...</p>
            </div>
        );
    }





    return (
        <ResponsiveContainer width="100%" height="100vh" id="gMap">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnMount}
        />
        </ResponsiveContainer>
    );
};

export default Map;
