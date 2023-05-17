import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Map from '../components/Map.tsx';

const  center: { lat: number; lng: number }
= { lat: 13.7465337, lng: 100.5391488 };


    function onLoad(map)  {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(24);
    }
   function onUnMount(map){
        map = null;
   }

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Map">
                <Map center={center} onLoad={onLoad} onUnMount={onUnMount}/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
