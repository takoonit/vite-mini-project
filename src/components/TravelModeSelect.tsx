import {FC} from 'react';
import {TravelMode} from '../configs/MapConfigs.tsx';
import {Select} from 'antd';

interface TravelModeSelectProps {
    setTravelMode: (mode: TravelMode) => void;
}


const travelModeOptions = Object.entries(TravelMode).map(([key, value]) => ({
    value,
    label: key.charAt(0).toUpperCase() + key.slice(1),
}));

const TravelModeSelect:FC<TravelModeSelectProps> = ({ setTravelMode }) => {
    const handleSelect = (event) => {
        const mode = event.target.value;
        setTravelMode(mode);
    };

    return    (
        <Select onChange={handleSelect}>
            {travelModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
};

export default TravelModeSelect;
