import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import React, { useState, useCallback } from 'react';
import {HiOutlineLocationMarker} from 'react-icons/all';
import {Input} from 'antd';

interface LocationSearchProps {
    setLocation: (arg: any) => void,
    isLoaded: boolean,
    loadError: Error | undefined
}

const LocationSearch: React.FC<LocationSearchProps> = ({ setLocation, isLoaded, loadError }) => {
    const [address, setAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const options = {
        fields: ["place_id", "geometry", "name"],
        componentRestrictions: { country: "th" },
        types: ["establishment"],
    };

    const handleSelect = useCallback(async (value: string) => {
        setIsLoading(true);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setAddress(value);
            setLocation(latLng);
        } catch (error) {
            console.error('Error occurred in geocoding address: ', error);
        } finally {
            setIsLoading(false);
        }
    }, [setLocation]);

    if (!isLoaded) {
        return (
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                <p className="font-bold">Loading Maps</p>
                <p className="text-sm">Maps are currently loading. Please wait...</p>
            </div>
        );
    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={{...options}}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                const { ...inputProps } = getInputProps();
                const inputId = 'location-search-input';
                return (
                    <div className="w-full max-w-xs">
                        <Input
                            {...inputProps}
                            id={inputId}
                            type="text"
                            placeholder="Location"
                            autoComplete="on"
                            allowClear={true}
                            className="border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                            disabled={!isLoaded && !loadError}
                        />
                        {loading && <div className="text-gray-500">...loading</div>}
                        <ul className="mt-2 bg-white shadow rounded overflow-hidden">
                            {suggestions.map((suggestion, index) => {
                                const { ...suggestionProps } = getSuggestionItemProps(suggestion);
                                const className = suggestion.active ? 'bg-blue-200' : 'bg-white';
                                return (
                                    <li {...suggestionProps} key={index}
                                        className={`py-1 px-2 hover:bg-blue-200 cursor-pointer ${className}`}>
                                        {suggestion.description}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }}
        </PlacesAutocomplete>
    );
};

export default LocationSearch;
