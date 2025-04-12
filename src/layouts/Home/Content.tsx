import { Link, useSearchParams } from "react-router";
import Card from "../../components/Card";
import classNames from "classnames";
import { PokemonDetails, PokemonListData } from "../../type/pokemon";
import { useEffect, useMemo, useState } from "react";
import { getPokemon } from "../../api/pokemon";
import { useAppContext } from "../../context/AppContext";
import ReactPaginate from "react-paginate";

type Props = {
  data: PokemonListData[];
};

type ListDisplayerProps = {
  data: PokemonListData;
};

const ListDisplayer = ({ data }: ListDisplayerProps) => {
  const { dispatch } = useAppContext();

  const [pokemonDetailData, setPokemonDetailData] =
    useState<PokemonDetails | null>(null);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const handleGetDetailPokemon = async () => {
    try {
      const response: PokemonDetails = await getPokemon(data.url);
      setPokemonDetailData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetailPokemon();
  }, [data.url]);

  const handleUpdateDetailPokemon = () => {
    if (pokemonDetailData)
      dispatch({ type: "SET_POKEMON_DETAIL", payload: pokemonDetailData });
  };

  return (
    <Link
      onClick={handleUpdateDetailPokemon}
      className={classNames(
        "sm:w-1/2 md:w-1/4 lg:w-1/6 ",
        type === "single" ? "w-full" : "w-[48%]"
      )}
      to={`/pokemon/${data.name}`}
    >
      <Card
        containerClassName={classNames(
          "w-full flex items-center justify-between flex-col h-[200px]"
        )}
      >
        {pokemonDetailData && (
          <>
            <div className="grow flex justify-center items-center">
              <img
                src={pokemonDetailData.sprites.other.dream_world.front_default}
                alt={data.name}
                className="h-24"
              />
            </div>
            <span className="mt-2">
              <p className="capitalize">{data.name}</p>
            </span>
          </>
        )}
      </Card>
    </Link>
  );
};

function Content({ data }: Props) {
  const { state } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageCount, page } = state.pokemon.pagination;

  const paginationItemClassname = useMemo(
    () =>
      "cursor-pointer w-8 h-8 flex justify-center items-center border border-light-grey rounded-lg hover:bg-gray-800 bg-gray-700",
    []
  );

  return (
    <section className="flex mt-10 justify-between flex-wrap gap-2 md:gap-10">
      {data.map((pokemon, index) => (
        <ListDisplayer data={pokemon} key={index} />
      ))}
      <div className="w-full flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          forcePage={page - 1}
          pageRangeDisplayed={1}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          nextClassName={paginationItemClassname}
          previousClassName={paginationItemClassname}
          containerClassName="flex gap-2"
          pageClassName={paginationItemClassname}
          pageLinkClassName="w-full text-center"
          previousLinkClassName="w-full text-center"
          nextLinkClassName="w-full text-center"
          activeClassName="bg-gray-800"
          onPageChange={(value) => {
            setSearchParams({
              ...Object.fromEntries(searchParams),
              page: (value.selected + 1).toString(),
            });
          }}
        />
      </div>
    </section>
  );
}

export default Content;
