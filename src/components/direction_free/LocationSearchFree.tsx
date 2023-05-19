import {AutoComplete} from 'antd';
import {useState} from 'react';

interface LocationSearchFreeProps {
    setLocation: (arg: any) => void
}
interface Location {
    place_id: number;
    name: string;
    latitude: number;
    longitude: number;
}
const locations = [
    { place_id: 1, name: 'Grand Palace', latitude: 13.751, longitude: 100.492 },
    { place_id: 2, name: 'Wat Arun', latitude: 13.743, longitude: 100.488 },
    { place_id: 3, name: 'Chatuchak Weekend Market', latitude: 13.799, longitude: 100.551 },
    { place_id: 4, name: 'Wat Phra Kaew', latitude: 13.751, longitude: 100.492 },
    { place_id: 5, name: 'MBK Center', latitude: 13.744, longitude: 100.531 },
    { place_id: 6, name: 'Jim Thompson House', latitude: 13.751, longitude: 100.534 },
    { place_id: 7, name: 'Wat Pho', latitude: 13.746, longitude: 100.493 },
    { place_id: 8, name: 'Terminal 21', latitude: 13.737, longitude: 100.557 },
    { place_id: 9, name: 'Siam Paragon', latitude: 13.746, longitude: 100.534 },
    { place_id: 10, name: 'Lumphini Park', latitude: 13.729, longitude: 100.542 },
    { place_id: 11, name: 'Wat Saket', latitude: 13.756, longitude: 100.507 },
    { place_id: 12, name: 'CentralWorld', latitude: 13.746, longitude: 100.539 },
    { place_id: 13, name: 'Wat Traimit', latitude: 13.739, longitude: 100.514 },
    { place_id: 14, name: 'Chao Phraya River', latitude: 13.730, longitude: 100.513 },
    { place_id: 15, name: 'Asiatique The Riverfront', latitude: 13.717, longitude: 100.508 },
    { place_id: 16, name: 'Yaowarat (Chinatown)', latitude: 13.736, longitude: 100.514 },
    { place_id: 17, name: 'Golden Mount', latitude: 13.758, longitude: 100.501 },
    { place_id: 18, name: 'Victory Monument', latitude: 13.762, longitude: 100.537 },
    { place_id: 19, name: 'Wat Benchamabophit (Marble Temple)', latitude: 13.771, longitude: 100.509 },
    { place_id: 20, name: 'Erawan Shrine', latitude: 13.736, longitude: 100.540 },
    { place_id: 21, name: 'Wat Suthat', latitude: 13.751, longitude: 100.504 },
    { place_id: 22, name: 'The Grand Pagoda', latitude: 13.745, longitude: 100.490 },
    { place_id: 23, name: 'EmQuartier', latitude: 13.734, longitude: 100.566 },
    { place_id: 24, name: 'The Golden Buddha', latitude: 13.730, longitude: 100.514 },
    { place_id: 25, name: 'Bangkok Art and Culture Centre', latitude: 13.746, longitude: 100.534 },
    { place_id: 26, name: 'Wat Ratchanatdaram', latitude: 13.751, longitude: 100.502 },
    { place_id: 27, name: 'Chinatown Gate', latitude: 13.736, longitude: 100.509 },
    { place_id: 28, name: 'Central Embassy', latitude: 13.743, longitude: 100.548 },
    { place_id: 29, name: 'Wat Benchamabophit Dusitvanaram', latitude: 13.769, longitude: 100.506 },
    { place_id: 30, name: 'The Jim Thompson Farm', latitude: 13.737, longitude: 100.530 },
];

const LocationSearchFree: React.FC<LocationSearchFreeProps> = ({ setLocation }) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<Location[]>([]);

    const searchLocations = (term: string) => {
        const searchTerm = term.toLowerCase();

        const searchResults = locations.filter((location) => {
            const locationName = location.name.toLowerCase();
            return locationName.includes(searchTerm);
        });

        return searchResults;
    };

    const onSelect = (name, selected:{value:string, place_id:number}) => {
        console.log('onSelect', name, selected);
        const selectedLocation = locations.find((location) => location.place_id === selected.place_id)
        if (selectedLocation) {
            setLocation(selectedLocation);
        }
    };

    const onChange = (data: string) => {
        setValue(data);
    };

    const handleSearch = (text: string) => {
        const searchResults = searchLocations(text);
        setOptions(searchResults);
    };

    return (
        <AutoComplete
            value={value}
            options={options.map((location) => ({ value: location.name, place_id: location.place_id }))}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={handleSearch}
            onChange={onChange}
            placeholder="Search for a location"
        />
    );
};

export default LocationSearchFree;

