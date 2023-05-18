const TravelModeSelect = ({ setTravelMode }: any) => {
    const handleSelect = (event: any) => {
        setTravelMode(event.target.value);
    };

    return (
        <select onChange={handleSelect}>
            <option value="DRIVING">Car</option>
            <option value="TRANSIT">Bus</option>
            <option value="TRAIN">Train</option>
        </select>
    );
};

export default TravelModeSelect;
