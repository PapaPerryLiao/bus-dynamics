import L, { divIcon } from "leaflet";
import { FC } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker as LeafletMarker, Popup } from "react-leaflet";

type Props = {
  position: {
    x: number;
    y: number;
  };
  IconComponent: React.ReactElement;
  infoWindow?: string;
};

const Marker: FC<Props> = ({ position, IconComponent, infoWindow }) => {
  const icon = divIcon({
    html: ReactDOMServer.renderToString(IconComponent),
    iconSize: L.point(30, 30),
    iconAnchor: L.point(15, 30),
    className: "icon",
  });

  return (
    <LeafletMarker position={[position.y, position.x]} icon={icon}>
      {infoWindow && <Popup>{infoWindow}</Popup>}
    </LeafletMarker>
  );
};

export default Marker;
