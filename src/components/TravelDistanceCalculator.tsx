import { useCallback, useState } from 'react';
import LocationSearch from './LocationSearch.tsx';
import TravelModeSelect from './TravelModeSelect.tsx';
import MapConfigs from '../configs/MapConfigs.tsx';
import {useLoadScript} from '@react-google-maps/api';
import RouteSelect from './RouteSelect.tsx';
import Map from './Map.tsx';
import { Button, Space } from 'antd';

const center = {
    lat: 13.7465337,
    lng: 100.5391488
};
const libraries = ['places'];
const TravelDistanceCalculator = () => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING');
    const [alternateRoutes, setAlternateRoutes] = useState<any>([]);
    const [route, setRoute] = useState<any>(null);
    const [distance, setDistance] = useState<number | null>(null);


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MapConfigs.REACT_APP_GOOGLE_MAPS_API_KEY || "",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        libraries: libraries,
    });

    const applyLocation = useCallback(() => {
        console.log('applyLocation',{origin, destination});
        if(origin && destination) {
            setSelectedOrigin(origin);
            setSelectedDestination(destination);
            console.log(origin);
        }
    }, [origin, destination]);

    return (isLoaded &&
        <Space wrap id="xxxxx">
            <LocationSearch isLoaded={isLoaded} loadError={loadError} setLocation={setOrigin} />
            <LocationSearch isLoaded={isLoaded} loadError={loadError} setLocation={setDestination} />
            <TravelModeSelect setTravelMode={setTravelMode} />
            <Button type="primary" onClick={applyLocation}>Apply</Button>
            <RouteSelect  routes={alternateRoutes ? [...alternateRoutes] : []} setRoute={setRoute}  setDistance={setDistance}/>
            <Map origin={selectedOrigin} destination={selectedDestination} travelMode={travelMode} setDistance={setDistance} setAlternateRoutes={setAlternateRoutes}/>
            {distance && <p>Distance: {distance} meters</p>}
            <p>Travel Mode: {travelMode}</p>
            <p>Origin: {JSON.stringify(origin)}</p>
            <p>Destination: {JSON.stringify(destination)}</p>
        </Space>
    );
};

export default TravelDistanceCalculator;
