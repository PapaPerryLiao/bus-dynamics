import Marker from "@components/Map/Marker";
import { Point } from "@customTypes/Point";
import React, { FC } from "react";
import { useMap } from "react-leaflet";

type Props = {
  dataList: Array<Point>;
  IconComponent: React.ReactElement;
};

const MultiMarker: FC<Props> = ({ dataList, IconComponent }) => {
  const map = useMap();

  dataList &&
    dataList.length > 0 &&
    map.fitBounds([
      [Math.min(...dataList?.map(({ y }) => y)), Math.min(...dataList?.map(({ x }) => x))],
      [Math.max(...dataList?.map(({ y }) => y)), Math.max(...dataList?.map(({ x }) => x))],
    ]);

  return (
    <div className="container">
      {dataList?.map(({ x, y, content, IconComponent: Icon }, index) => {
        return (
          <div key={index}>
            <Marker position={{ x, y }} IconComponent={Icon ? Icon : IconComponent} infoWindow={content} />
          </div>
        );
      })}
    </div>
  );
};

export default MultiMarker;
