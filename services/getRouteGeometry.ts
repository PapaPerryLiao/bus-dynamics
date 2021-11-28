import axios from "@services/baseAxios";
import transWKTtoList from "@utils/transWKTtoList";

type Args = {
  county: string;
  routeName: string;
};

const getRouteGeometry = async ({ county, routeName }: Args) => {
  const { data } = await axios.get(
    `MOTC/v2/Bus/Shape/City/${county}/${routeName}?$top=10&$format=JSON`
  );

  if (data?.length > 0) {
    return transWKTtoList(data[0]?.Geometry);
  } else {
    return {
      type: null,
      pointList: [],
    };
  }
};

export default getRouteGeometry;
