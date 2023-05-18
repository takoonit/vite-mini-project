import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {Button} from 'antd';



const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Button">
                <Button>Button</Button>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
