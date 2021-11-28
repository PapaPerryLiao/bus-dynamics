import { createContext, Dispatch } from "react";

interface ContextInterface {
  searchText: string;
  setSearchText: Dispatch<string>;
  county: string;
  setCounty: Dispatch<string>;
  direction: number;
  setDirection: Dispatch<number>;
}

const SearchContext = createContext<ContextInterface>({} as ContextInterface);

export default SearchContext;
