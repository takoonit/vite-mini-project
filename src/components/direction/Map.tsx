import {DirectionsService, GoogleMap} from '@react-google-maps/api';
import {useState} from 'react';

interface MapProps {
    origin: {
        lat: number,
        lng: number
    } | null
    destination: {
        lat: number,
        lng: number
    } | null,
    travelMode: string,
    setAlternateRoutes: (route: any) => void,
}

const Map: React.FC<MapProps> = ({
                                     origin,
                                     destination,
                                     travelMode,
                                     setAlternateRoutes,
                                 }) => {

    const [error, setError] = useState<any>(null);

    console.log('Map',{ origin, destination, travelMode });
    const directionsCallback = (response: any) => {
        console.log('directionsCallback');
        if(!response)
            return;
        if (response.status === 'OK') {
            console.log(response);
            setAlternateRoutes(response.routes);
        } else {
            setError(response);
        }
    }

    return (<GoogleMap
            mapContainerStyle={{
                height: '400px',
                width: '100%'
            }}
            zoom={2}
            center={{
                lat: 0,
                lng: -180
            }}
        >
            {
                (
                    destination &&
                    origin
                ) && (
                    <DirectionsService
                        // required
                        options={{
                            destination: destination,
                            origin: origin,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            travelMode: travelMode,
                            provideRouteAlternatives: true
                        }}
                        // required
                        callback={directionsCallback}
                        // optional
                        onLoad={directionsService => {
                            console.log('DirectionsService onLoad directionsService: ', directionsService)
                        }}
                        // optional
                        onUnmount={directionsService => {
                            console.log('DirectionsService onUnmount directionsService: ', directionsService)
                        }}
                    />
                )
            }
            {/*{*/}
            {/*    selectedDirections &&*/}
            {/*    <DirectionsRenderer*/}
            {/*        options={{*/}
            {/*            directions: directions*/}
            {/*        }}*/}
            {/*    />*/}
            {/*}*/}
        </GoogleMap>
    );
}

export default Map;
