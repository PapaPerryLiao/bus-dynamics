import Point from "@customTypes/Point";
import { FC } from "react";
import { Circle as LeafletCircle } from "react-leaflet";

type Props = {
  position: Point;
  radius: number;
};

const Circle: FC<Props> = ({ position, radius }) => {
  return <LeafletCircle center={[position.y, position.x]} radius={radius} />;
};

export default Circle;
