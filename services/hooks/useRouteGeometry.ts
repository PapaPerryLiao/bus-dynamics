import getRouteGeometry from "@services/getRouteGeometry";
import { useQuery } from "react-query";

type Args = {
  county: string;
  routeName: string;
};

const useRouteGeometry = ({ county, routeName }: Args) => {
  const { data, ...params } = useQuery(["RouteGeometry", county, routeName], async () => await getRouteGeometry({ county, routeName }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data,
    ...params,
  };
};

export default useRouteGeometry;
