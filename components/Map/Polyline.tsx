import { FC } from "react";
import { Polyline as LeafletPolyline } from "react-leaflet";
import { Point } from "@customTypes/Point";

type Props = {
  dataList: Array<Point>;
  options?: {
    color: string;
  };
};

const Polyline: FC<Props> = ({ dataList, options }) => {
  //FIXME positons type
  const positions: any = dataList.map(({ x, y }) => [y, x]);

  return (
    <div className="container">
      <LeafletPolyline pathOptions={options} positions={positions} />
    </div>
  );
};

export default Polyline;
