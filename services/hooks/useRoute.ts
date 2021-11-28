import getRoute from "@services/getRoute";
import { useQuery } from "react-query";

type Args = {
  county: string;
};

const useRoute = ({ county }: Args) => {
  const { data, ...params } = useQuery(["Route", county], async () => await getRoute({ county }), {
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  return {
    data: data || [],
    ...params,
  };
};

export default useRoute;
