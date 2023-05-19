import {Dispatch, FC, SetStateAction, useState} from 'react';
import {Card, Collapse, List, Timeline} from 'antd';

const {Panel} = Collapse;


interface RouteSelectProps {
    routes: any[] | null;
    setRoute: Dispatch<SetStateAction<any>>;
    setDistance: (distance: number) => void;
}


const RouteSelect: FC<RouteSelectProps> = ({ routes, setRoute, setDistance}) => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const handleRouteSelect = (route: any) => {
        setSelectedRoute(route);
        if (route) {
            setRoute(route);
            console.log('Route: ', route);
            let distance = 0;
            for (let i = 0; i < route.legs.length; i++) {
                distance += parseFloat(route.legs[i]?.distance?.text);
            }
            setDistance(distance);
        }
    };

    if (!routes || routes.length === 0) {
        return <p>No routes found</p>
    }

    return (
        <div style={{ display: 'flex' }}>
            <List
                style={{ width: '30%', marginRight: '20px' }}
                dataSource={routes}
                renderItem={(route, index) => (
                    <List.Item
                        onClick={() => handleRouteSelect(route)}
                        style={{ cursor: 'pointer', backgroundColor: selectedRoute === route ? '#e6f7ff' : 'transparent' }}
                    >
                        <p>Route {index + 1}</p>
                        {route.fare && <p>Fare: {route.fare.text}</p>}
                    </List.Item>
                )}
            />
            {selectedRoute && (
                <Card title="Selected Route" style={{ width: '70%' }}>
                    <Timeline>
                        {selectedRoute.legs.map((leg, legIndex) => (
                            <Timeline.Item key={legIndex}>
                                <p>{leg.distance.text} - {leg.duration.text}</p>
                                <p>{leg.start_address}</p>
                                <p>{leg.end_address}</p>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Card>
            )}
        </div>
    );
};

export default RouteSelect;
