import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types';
import PlaceResult = google.maps.places.PlaceResult;


interface LocationSearchInputProps {
    map: google.maps.Map | null;
    onSelectLocation: (place: PlaceResult) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({map, onSelectLocation}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const options = {
            fields: ['place_id', 'geometry', 'name'],
            componentRestrictions: {country: 'th'},
            strictBounds: false,
            types: ['establishment'],
        };

        if (!map) {
            return ;
        }
        console.log('Auto Complete  inputRef initial: ', inputRef.current==undefined);

        if (inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);
            console.log('Auto Complete initial: ß', autocomplete==undefined);

            const listener = autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    console.error('No details available for input: \'' + place.name + '\'');
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                console.log(place)
                onSelectLocation(place);
            });

            // Clean up event listener
            return () => {
                window.google.maps.event.removeListener(listener);
            }
        }
    }, [map, onSelectLocation]);

    return (
        <div className="relative mt-1">
            <label htmlFor="location-search" className="sr-only">Location Search</label>
            <div
                className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <input
                    id="location-search"
                    ref={inputRef}
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                />
            </div>
        </div>
    )
}


LocationSearchInput.propTypes = {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    map: PropTypes.object,
    onSelectLocation: PropTypes.func.isRequired,
};

export default LocationSearchInput;

