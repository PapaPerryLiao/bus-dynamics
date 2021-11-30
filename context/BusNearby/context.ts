import Point from "@customTypes/Point";
import { createContext, Dispatch } from "react";

interface ContextInterface {
  longitude: string,
  setLongitude: Dispatch<string>,
  latitude: string,
  setLatitude: Dispatch<string>,
  radius: number;
  setRadius: Dispatch<number>;
  isGeoLoading: boolean;
  setIsGeoLoading: Dispatch<boolean>;
}

const SearchContext = createContext<ContextInterface>({} as ContextInterface);

export default SearchContext;
