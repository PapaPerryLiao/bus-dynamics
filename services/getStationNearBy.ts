import Point from "@customTypes/Point";
import axios from "@services/baseAxios";

type Args = {
  position: Point;
  radius: number;
};

const getStationNearBy = async ({ position, radius }: Args) => {
  const { x, y } = position;

  if (!x || !y || !radius) {
    return [];
  }

  const { data } = await axios.get(`MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${y}, ${x}, ${radius})&$top=100&$format=JSON`);

  return data;
};

export default getStationNearBy;
