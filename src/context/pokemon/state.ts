import {
  GetAllPokemonResponse,
  PokemonDetails,
  PokemonListData,
  PokemonPagination,
} from "../../type/pokemon";

export type PokemonState = {
  allData: GetAllPokemonResponse | null;
  currentPageData: PokemonListData[];
  pagination: PokemonPagination;
  detail: {
    data: PokemonDetails | null;
    loading: boolean;
    error: string;
  };
};

const intialState: PokemonState = {
  detail: {
    data: null,
    loading: false,
    error: "",
  },
  allData: null,
  currentPageData: [],
  pagination: {
    page: 1,
    pageCount: 1,
    totalData: 0,
  },
};

export default intialState;
