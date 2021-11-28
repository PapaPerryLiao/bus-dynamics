import getStopOfRoute from "@services/getStopOfRoute";
import { useQuery } from "react-query";

type Args = {
  county: string;
  routeName: string;
};

const useStopOfRoute = ({ county, routeName }: Args) => {
  const { data, ...params } = useQuery(["StopOfRoute", county, routeName], async () => await getStopOfRoute({ county, routeName }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data: data || [],
    ...params,
  };
};

export default useStopOfRoute;
