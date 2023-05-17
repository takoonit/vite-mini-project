
import {useCallback, useState} from 'react';
import LocationSearch from './components/LocationSearch';
import Chart from './components/Chart'
// import LocationSearchInput from './components/LocationSearchInput';
import Map from './components/Map';
import TravelModeSelect from './components/TravelModeSelect';
// import { getDistance } from 'geolib';
// import {useJsApiLoader} from '@react-google-maps/api';
// import PlaceResult = google.maps.places.PlaceResult;

const center = {
    lat: 13.7465337,
    lng: 100.5391488
};
const rawData :any = [
    {
      "month": 1,
      "year": 1,
      "down": 99996,
      "installment": 52000.00000000001,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 228742.67199999993,
      "car": 96924,
      "publicTransport": 78000
    },
    {
      "month": 13,
      "year": 2,
      "down": 0,
      "installment": 52000.00000000001,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 128746.67199999996,
      "car": 54552,
      "publicTransport": 78000
    },
    {
      "month": 25,
      "year": 3,
      "down": 0,
      "installment": 52000.00000000001,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 128746.67199999996,
      "car": 54552,
      "publicTransport": 78000
    },
    {
      "month": 37,
      "year": 4,
      "down": 0,
      "installment": 52000.00000000001,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 128746.67199999996,
      "car": 54552,
      "publicTransport": 78000
    },
    {
      "month": 49,
      "year": 5,
      "down": 0,
      "installment": 52000.00000000001,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 128746.67199999996,
      "car": 54552,
      "publicTransport": 78000
    },
    {
      "month": 61,
      "year": 6,
      "down": 0,
      "installment": 0,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 76746.67199999999,
      "car": 32520,
      "publicTransport": 78000
    },
    {
      "month": 73,
      "year": 7,
      "down": 0,
      "installment": 0,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 76746.67199999999,
      "car": 32520,
      "publicTransport": 78000
    },
    {
      "month": 85,
      "year": 8,
      "down": 0,
      "installment": 0,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 76746.67199999999,
      "car": 32520,
      "publicTransport": 78000
    },
    {
      "month": 97,
      "year": 9,
      "down": 0,
      "installment": 0,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 76746.67199999999,
      "car": 32520,
      "publicTransport": 78000
    },
    {
      "month": 109,
      "year": 10,
      "down": 0,
      "installment": 0,
      "insurance": 18000,
      "gas": 45750.67199999999,
      "parking": 6000,
      "maintenance": 6996,
      "totalCarCost": 76746.67199999999,
      "car": 32520,
      "publicTransport": 78000
    }
]
const App = () => {
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: 'AIzaSyDKp2W76rJIL5MIoYzNML7QUn10eFeC0dg' as string,
    //     libraries: ['places']
    // })

    const [googleMap, setGoogleMap] = useState(null)
    const [location1, setLocation1] = useState<google.maps.places.PlaceResult>(); // Default location 1
    const [location2, setLocation2] = useState<google.maps.places.PlaceResult>(); // Default location 2
    const [travelMode, setTravelMode] = useState('DRIVING'); // Default travel mode

    function getRoute(location1: google.maps.places.PlaceResult | undefined, location2: google.maps.places.PlaceResult | undefined) {

    }

    //const distance = getRoute(location1, location2);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(24);

        setGoogleMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setGoogleMap(null)
    }, [])

    return (
        <div id="xxxxx">
            {/*<LocationSearchInput map = {googleMap} onSelectLocation={setLocation1} />*/}

            <LocationSearch setLocation={setLocation1} />
            <LocationSearch setLocation={setLocation2} />
            <TravelModeSelect setTravelMode={setTravelMode} />
            <Map center={center} onLoad={onLoad} onUnMount={onUnmount}/>
            <div className="w-9/12">
                <Chart rawData={rawData} ttf={0.66} cf={0.8} ifVal={0.9} />
            </div>
            {/*<p>Distance: {distance} meters</p>*/}
            {/*<p>Travel Mode: {travelMode}</p>*/}
        </div>
    );
};

export default App;
