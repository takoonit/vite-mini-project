
import {useCallback, useState} from 'react';
import LocationSearch from './components/LocationSearch';
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
            {/*<p>Distance: {distance} meters</p>*/}
            {/*<p>Travel Mode: {travelMode}</p>*/}
        </div>
    );
};

export default App;
