import axios from "@services/baseAxios";

type Args = {
  county: string;
};

const getRoute = async ({ county }: Args) => {
  const { data } = await axios.get(`MOTC/v2/Bus/Route/City/${county}?$top=100&$format=JSON`);

  return data;
};

export default getRoute;
