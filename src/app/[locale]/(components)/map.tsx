import { ENV } from '@/config/enviroments';
import { load } from '@2gis/mapgl';
import type { Map as MapglMap, Marker as MapglMarker } from '@2gis/mapgl/types';
import { memo, useEffect } from "react";

const MapWrapperBase = () => {
    return <div id="map-container" style={{ width: '100%', height: '100%' }} />;
};

const MapWrapper = memo(MapWrapperBase);
MapWrapper.displayName = "MapWrapper";

export const Map = () => {
    useEffect(() => {
        let map: MapglMap | null = null;
        let marker: MapglMarker | null = null;

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [69.38258, 53.29991],
                zoom: 13,
                key: ENV.DGIS_KEY,
            });

            marker = new mapglAPI.Marker(map, {
                coordinates: [69.382588, 53.299919],
                icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
                size: [32, 32],
                anchor: [16, 32],
            });
        });

        return () => {
            if (map) {
                map.destroy();
                map = null;
            }
            marker = null;
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};
