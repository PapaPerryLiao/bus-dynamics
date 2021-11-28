import axios from "@services/baseAxios";

type Args = {
  county: string;
  routeName: string;
};

const getStopOfRoute = async ({ county, routeName }: Args) => {
  const { data } = await axios.get(`MOTC/v2/Bus/DisplayStopOfRoute/City/${county}/${routeName}?$top=100&$format=JSON`);

  return data;
};

export default getStopOfRoute;
