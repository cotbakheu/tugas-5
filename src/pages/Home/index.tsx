import { useEffect, useState } from "react";
import Content from "../../layouts/Home/Content";
import Filter from "../../layouts/Home/Filter";
import { getAllPokemon } from "../../api/pokemon";
import { GetAllPokemonResponse } from "../../type/pokemon";
import { useAppContext } from "../../context/AppContext";
import { useSearchParams } from "react-router";
import { PageViewType } from "../../type/global";

function Home() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  const { state, dispatch } = useAppContext();
  const data = state.pokemon.currentPageData;

  const [isLoading, setIsLoading] = useState(false);
  const [errorGetAllData, setErrorGetAllData] = useState("");

  const fetchPokemonData = async () => {
    const currentLocalStorageData = localStorage.getItem("pokeList");
    if (currentLocalStorageData) {
      dispatch({
        type: "SET_POKEMON_DATA",
        payload: JSON.parse(currentLocalStorageData),
      });
      handleSetPageData();
      return;
    }
    setIsLoading(true);
    try {
      const response: GetAllPokemonResponse = await getAllPokemon({
        limit: 200,
        offset: 200,
      });
      dispatch({ type: "SET_POKEMON_DATA", payload: response });
      localStorage.setItem("pokeList", JSON.stringify(response));
      handleSetPageData();
    } catch (error) {
      setErrorGetAllData(error as string);
    }
    setIsLoading(false);
  };

  function handleSetPageData() {
    dispatch({
      type: "SET_POKEMON_DATA_PAGE",
      payload: {
        page: parseInt(page || "1"),
        order: order,
        sort: sort,
        search: search,
      },
    });
  }

  useEffect(() => {
    if (!state.pokemon.allData && !errorGetAllData) {
      fetchPokemonData();
    }
  }, [state.pokemon.allData, errorGetAllData]);

  useEffect(() => {
    handleSetPageData();
  }, [page, sort, order, type, search]);

  useEffect(() => {
    dispatch({
      type: "SET_PAGE_VIEW",
      payload: {
        pageView: localStorage.getItem("pageView") as PageViewType,
      },
    });
  }, []);

  return (
    <main className="px-4 py-6 md:px-20">
      <Filter />
      {isLoading ? <p>Loading...</p> : <Content data={data} />}
      {errorGetAllData && <p>{errorGetAllData}</p>}
    </main>
  );
}

export default Home;
