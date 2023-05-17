import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useLoadScript} from '@react-google-maps/api';
import MapConfigs from '../configs/MapConfigs.tsx';

interface LocationSearchProps {
    setLocation: (arg: any) => void
}

const LocationSearch: React.FC<LocationSearchProps> = ({ setLocation }) => {
    const [address, setAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: MapConfigs.REACT_APP_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places'],
    });

    if (loadError) {
        return (
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">Error</p>
                <p className="text-sm">Google Maps API key is missing. Please provide the API key.</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">Loading Maps</p>
                <p className="text-sm">Maps are currently loading. Please wait...</p>
            </div>
        );
    }
    const handleSelect = async (value: string) => {
        setIsLoading(true);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value);
            setLocation(latLng);
        } catch (error) {
            console.error('Error occurred in geocoding address: ', error);
            // You might want to set an error state here and show it to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div className="w-full max-w-xs">
                    <label htmlFor="location-search" className="sr-only">Type location</label>
                    <input id="location-search" {...getInputProps()}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    {loading && <div className="text-gray-500">...loading</div>}
                    <ul className="mt-2">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} {...getSuggestionItemProps(suggestion, {className: suggestion.active ? 'bg-blue-200' : ''})}
                                className="py-1 px-2 hover:bg-blue-200 cursor-pointer">
                                {suggestion.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

LocationSearch.propTypes = {
    setLocation: PropTypes.func.isRequired
};

export default LocationSearch;
