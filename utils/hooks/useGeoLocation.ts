import Point from "@customTypes/Point";
import { useQuery } from "react-query";

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords: { latitude, longitude } }: any) => {
        const point: Point = {
          x: longitude,
          y: latitude,
        };
        resolve(point);
      });
    }
  });
};

const useGeoLocation = ({ onSuccess }: any) => {
  const { data, ...params } = useQuery(["UserLocation"], getLocation, {
    refetchOnWindowFocus: false,
    staleTime: 300000,
    onSuccess,
  });

  return {
    data: data || {},
    ...params,
  };
};

export default useGeoLocation;
