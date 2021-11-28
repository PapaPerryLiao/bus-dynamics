import Point from "@customTypes/Point";
import getStationNearBy from "@services/getStationNearBy";
import { useQuery } from "react-query";

type Args = {
  position: Point;
  radius: number;
};

const useStationNearBy = ({ position, radius }: Args) => {
  const { data, ...params } = useQuery(["StationNearBy", position, radius], async () => await getStationNearBy({ position, radius }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data: data || [],
    ...params,
  };
};

export default useStationNearBy;
