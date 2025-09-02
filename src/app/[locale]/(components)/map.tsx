import {load} from '@2gis/mapgl';
import {memo, useEffect} from "react";

const MapWrapper = memo(
    () => {
        return <div id="map-container" style={{width: '100%', height: '100%'}}></div>;
    },
    () => true,
);

export const Map = () => {
    useEffect(() => {
        let map;
        let marker;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [69.38258, 53.29991],
                zoom: 13,
                key: 'c3ed22ca-21c0-4346-a2ab-5a63a7c801c7',
            });

            marker = new mapglAPI.Marker(map, {
                coordinates: [69.382588, 53.299919],
                icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
                size: [32, 32],
                anchor: [16, 32],
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{width: '100%', height: '100%'}}>
            <MapWrapper/>
        </div>
    );
};
