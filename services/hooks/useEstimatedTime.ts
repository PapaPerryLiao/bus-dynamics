import getEstimatedTime from "@services/getEstimatedTime";
import { useQuery } from "react-query";

type Args = {
  county: string;
  routeName: string;
};

const useEstimatedTime = ({ county, routeName }: Args) => {
  const { data, ...params } = useQuery(["EstimatedTime", county, routeName], async () => await getEstimatedTime({ county, routeName }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data: data || [],
    ...params,
  };
};

export default useEstimatedTime;
