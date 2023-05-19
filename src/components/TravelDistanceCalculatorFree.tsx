import {useState} from 'react';
import MapConfigs from '../configs/MapConfigs.tsx';
import {Button, Divider, List, Space} from 'antd';
import LocationSearchFree from './direction_free/LocationSearchFree.tsx';
import {getAlternateRoutes, Route} from '../services/RouteService.ts';

const center = {
    lat: 13.7465337,
    lng: 100.5391488
};
const libraries = ['places'];

const mapApiKey: string = MapConfigs.MAP_API || '';

interface Location {
    place_id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const isLoaded = true;
const TravelDistanceCalculator = () => {
    const [origin, setOrigin] = useState<Location>(null);
    const [destination, setDestination] = useState<Location>(null);
    const [travelMode, setTravelMode] = useState('DRIVING');
    const [alternateRoutes, setAlternateRoutes] = useState<any>([]);
    const [route, setRoute] = useState<any>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

    const handleGetDirections = async () => {
        if (origin && destination) {
            try {
                const parsedRoutes = await getAlternateRoutes(origin, destination);
                console.log('parsedRoutes', parsedRoutes);
                setRoutes(parsedRoutes);
                setDistance(parsedRoutes[0].distance)
                setSelectedRoute(parsedRoutes[0]);
            } catch (error) {
                console.log('Error:', error);
            }
        }
    };

    const handleSelectRoute = (route: Route) => {
        console.log('handleSelectRoute', route.legs);
        setDistance(route.distance);
        setSelectedRoute(route);
    };

    return ((isLoaded) ?
            (<div>
                <Space wrap={false} id="xxxxx">
                    <LocationSearchFree setLocation={setOrigin}/>
                    <LocationSearchFree setLocation={setDestination}/>
                    <Button type="primary" onClick={handleGetDirections}>Apply</Button>
                    <br/>
                </Space>
                <Space wrap={false}>
                    <Divider/>
                    <br/>
                </Space>
                <List
                    bordered
                    dataSource={routes}
                    renderItem={(route) => (
                        <List.Item
                            onClick={() => handleSelectRoute(route)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: selectedRoute === route ? '#e6f7ff' : 'inherit'
                            }}
                        >
                            <List.Item.Meta title={`Distance: ${route.distance} km`}
                                            description={`Duration: ${route.duration}`}/>
                        </List.Item>
                    )}
                />
                {/*{(selectedRoute && (*/}
                {/*    <Timeline items={selectedRoute?.legs?.map((leg, index) => ({ children: leg.maneuvers, label: `Step ${index + 1}` }))} />*/}
                {/*) || <p>No route selected</p>)}*/}
                <p>Origin: {JSON.stringify(origin)}</p>
                <p>Destination: {JSON.stringify(destination)}</p>
            </div>) : (<p>Loading...</p>)

    );
};

export default TravelDistanceCalculator;
