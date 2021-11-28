import getRouteInfo from "@services/getRouteInfo";
import { useQuery } from "react-query";

type Args = {
  county: string;
  routeName: string;
};

const useRouteInfo = ({ county, routeName }: Args) => {
  const { data, ...params } = useQuery(["RouteInfo", county, routeName], async () => await getRouteInfo({ county, routeName }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data,
    ...params,
  };
};

export default useRouteInfo;
