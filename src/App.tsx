
import { useCallback, useState, createContext } from 'react';
import { Divider, Steps, Button } from 'antd';
import 'antd/dist/antd.css';
import LocationSearch from './components/LocationSearch';
import Result from './components/Result';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import {AppContext} from './contexts';
// import LocationSearchInput from './components/LocationSearchInput';
import Map from './components/Map';
import TravelModeSelect from './components/TravelModeSelect';
import { percentOptions, carModels, carTypes, downOptions, terms } from './common';
// import { getDistance } from 'geolib';
// import {useJsApiLoader} from '@react-google-maps/api';
// import PlaceResult = google.maps.places.PlaceResult;

const center = {
    lat: 13.7465337,
    lng: 100.5391488
};

const App = () => {
    const [factors, setFactors] = useState({
        monthlyIncome: 30000,
        saving: 100000,
        monthlyExpense: percentOptions[0].value,
        disposableIncome: percentOptions[0].value,
        insurance: 18000,
        gas: 0,
        parking: 500,
        maintenance: 7000,
        timeSpendUsingCar: 30,
        convenienceOfLoanignCar: 10,
        carModel: carModels[0].value,
        daysInOffice: 5,
        daysForLifeStyle: 2,
        distanceForLifeStyle: 10,
        loanTerm: terms[3].value,
        downPayment: downOptions[3].value,
        ticketCost: 4000,
        extraTravelCost: 2500,
        timeSpendUsingPublicTransport: 40,
        convenienceOfPublicTransport: 2,
        carType: carTypes[0].value,
        carDistance: 17,
    });
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
    const [current, setCurrent] = useState(0);
    const onChange = (value: number) => {
        setCurrent(value);
    };
    const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };
    const items = [
        {
            title: 'Step 1',
            description: 'Income Factors',
        },
        {
            title: 'Step 2',
            description: 'Car loaning cost estimation',
        },
        {
            title: 'Step 3',
            description: 'Public transport',
        },
        {
            title: 'Results',
        },
    ]
    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-200 pt-10 items-center">
            <div className="mx-auto">
                <Steps
                    size="small"
                    progressDot
                    current={current}
                    onChange={onChange}
                    items={items}
                />
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full md:w-6/12">
                <AppContext.Provider value={{ factors, setFactors }}>
                    <div id="xxxxx">
                        {/*<LocationSearchInput map = {googleMap} onSelectLocation={setLocation1} />*/}

                        {/* <LocationSearch setLocation={setLocation1} />
                        <LocationSearch setLocation={setLocation2} />
                        <TravelModeSelect setTravelMode={setTravelMode} />
                        <Map center={center} onLoad={onLoad} onUnMount={onUnmount} /> */}
                        
                        {/*<p>Distance: {distance} meters</p>*/}
                        {/*<p>Travel Mode: {travelMode}</p>*/}
                        {current === 0 && <Page1 />}
                        {current === 1 && <Page2 />}
                        {current === 2 && <Page3 />}
                        {current === 3 && <Result />}
                    </div>
                    <div className="mt-10 flex justify-between">
                    {current > 0 ? (
                        <Button onClick={() => prev()}>
                            Previous
                        </Button>
                    ) : <div></div>}
                    {current < items.length - 1 ? (
                        <Button className="b-0" onClick={() => next()}>
                            Next
                        </Button>
                    ) : <div></div>}
                    </div>
                </AppContext.Provider>
            </div>

        </div>
    );
};

export default App;
