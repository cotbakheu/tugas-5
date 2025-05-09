import {
  GetAllPokemonResponse,
  PokemonDetails,
  PokemonListData,
} from "../../type/pokemon";
import { CombinedReducerAction } from "../AppProvider";
import { PokemonState } from "./state";

export type SetDataPage = {
  type: "SET_POKEMON_DATA_PAGE";
  payload: {
    page: number;
    sort?: string | null;
    order?: string | null;
    search?: string | null;
  };
};

export type SetAllData = {
  type: "SET_POKEMON_DATA";
  payload: GetAllPokemonResponse;
};

export type UpdateAction = {
  type: "SET_POKEMON_DETAIL";
  payload: PokemonDetails;
};

export type PokemonAction = UpdateAction | SetAllData | SetDataPage;

const reducer = (
  state: PokemonState,
  action: CombinedReducerAction
): PokemonState => {
  switch (action.type) {
    case "SET_POKEMON_DETAIL":
      return {
        ...state,
        detail: {
          loading: false,
          data: action.payload,
          error: "",
        },
      };
    case "SET_POKEMON_DATA":
      return {
        ...state,
        allData: action.payload,
        pagination: {
          ...state.pagination,
          pageCount: Math.ceil(action.payload.results.length / 10),
          totalData: action.payload.results.length,
        },
      };
    case "SET_POKEMON_DATA_PAGE": {
      const { page, sort, order, search } = action.payload;
      let pageData: PokemonListData[] = [];
      if (!pageData) return state;
      if (search) {
        pageData =
          state.allData?.results.filter((pokemon) =>
            pokemon.name.includes(search)
          ) || [];
      }
      if (sort && order) {
        pageData =
          pageData.length <= 0 ? state.allData?.results || [] : pageData;
        pageData = pageData.sort((a, b) =>
          order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      }
      const pageCount = Math.ceil(pageData.length / 10);
      const totalData = pageData.length;
      if (page) {
        pageData =
          pageData.length <= 0 ? state.allData?.results || [] : pageData;
        pageData = pageData.slice((page - 1) * 10, page * 10) || [];
      }
      return {
        ...state,
        currentPageData: pageData || [],
        pagination: {
          pageCount,
          totalData,
          page: page || 1,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
