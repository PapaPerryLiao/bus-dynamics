import Point from "@customTypes/Point";
import { createContext, Dispatch } from "react";

interface ContextInterface {
  point: Point;
  setPoint: Dispatch<Point>;
  radius: number;
  setRadius: Dispatch<number>;
}

const SearchContext = createContext<ContextInterface>({} as ContextInterface);

export default SearchContext;
