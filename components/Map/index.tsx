import "leaflet/dist/leaflet.css";
import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

type Props = {
  children?: any;
  options?: {
    position?: {
      x: number;
      y: number;
    };
    zoom?: number;
    baseLayer?: {
      attribution: string;
      url: string;
    };
    bounds?: [];
    //TODO css props type
    style?: object;
  };
};

const Map: FC<Props> = ({ children, options }) => {
  return (
    <div className="container">
      <MapContainer
        center={options?.position ? [options.position.y, options.position.x] : [23.5, 121]}
        zoom={options?.zoom || 8}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution={options?.baseLayer?.attribution || '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
          url={
            options?.baseLayer?.url ||
            "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVycnlsaWFvIiwiYSI6ImNrdGVkYWJueTJveWEycm84NzZrMXJyZjAifQ.s8EyAc5U3E1c7wcN1qlE9w"
          }
        />
        {children}
      </MapContainer>

      <style jsx>{`
        .container {
          border: 1px solid black;
          width: 100%;
          height: 100%;
        }
        .icon {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Map;
