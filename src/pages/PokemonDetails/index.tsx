import { useNavigate, useParams } from "react-router";
import GeneralInfo from "../../layouts/PokemonDetails/GeneralInfo";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { getPokemon } from "../../api/pokemon";
import { PokemonDetails as PokemonDetailsType } from "../../type/pokemon";
import Stats from "../../layouts/PokemonDetails/Stats";

function PokemonDetails() {
  // context
  const { state, dispatch } = useAppContext();
  const { data } = state.pokemon.detail;
  const navigate = useNavigate();

  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    if (data === null) {
      handleGetDetailPokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function handleGetDetailPokemon() {
    try {
      const response: PokemonDetailsType = await getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      dispatch({ type: "SET_POKEMON_DETAIL", payload: response });
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <main className="p-6 flex justify-center">
      <div className="w-full sm:w-[70%] md:w-[40%] lg:w-[30%] sm:bg-gray-700 sm:rounded-2xl sm:p-6">
        <p className="text-light-grey text-2xl mb-4">#{data?.order}</p>
        <GeneralInfo
          imgUrl={data?.sprites.other.dream_world.front_default || ""}
          spriteUrl={data?.sprites.front_default || ""}
          name={data?.name || ""}
        />
        <div className="mt-2"></div>
        <Stats />
        <div className="mt-2">
          <button
            onClick={handleClickBack}
            className="w-full rounded-xl text-light-grey bg-dark p-2 text-lg"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default PokemonDetails;
