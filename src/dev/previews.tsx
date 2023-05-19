import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import TravelDistanceCalculator from '../components/TravelDistanceCalculator.tsx';



const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/TravelDistanceCalculator">
                <TravelDistanceCalculator></TravelDistanceCalculator>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
