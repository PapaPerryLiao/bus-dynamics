import Point from "@customTypes/Point";

//FIXME only deal with simple geometry, multi geometry would get error
const transWKTtoList = (wkt: string) => {
  let type = null;
  let pointList: Point[] = [];

  if (!wkt) {
    return {
      type: type,
      pointList: pointList,
    };
  }

  wkt = wkt.toLowerCase();
  const isLineString = wkt.includes("linestring");
  const isPolygon = wkt.includes("polygon");
  const isPoint = wkt.includes("point");

  if (isLineString) {
    wkt = wkt.replace("linestring", "");
    type = "linestring";
  } else if (isPolygon) {
    wkt = wkt.replace("polygon", "");
    type = "polygon";
  } else if (isPoint) {
    wkt = wkt.replace("point", "");
    type = "point";
  }

  pointList = wkt
    .trim()
    .split(",")
    .map((item) => {
      const _item = item.trim().replace("(", "").replace(")", "").split(" ");
      return {
        x: Number(_item[0]),
        y: Number(_item[1]),
      };
    });

  return {
    type: type,
    pointList: pointList,
  };
};

export default transWKTtoList;
