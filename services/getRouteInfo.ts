import axios from "@services/baseAxios";

type Args = {
  county: string;
  routeName: string;
};

const getRouteInfo = async ({ county, routeName }: Args) => {
  if (!county || !routeName) {
    return {};
  }

  const { data } = await axios.get(`MOTC/v2/Bus/Route/City/${county}/${routeName}?$top=100&$format=JSON`);

  if (data?.length > 0) {
    return data[0];
  } else {
    return {};
  }
};

export default getRouteInfo;
