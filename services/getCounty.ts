import axios from "@services/baseAxios";

const getCounty = async () => {
  const { data } = await axios.get(`v2/Basic/County?$format=JSON`);

  return data;
};

export default getCounty;
