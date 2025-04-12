import { ReactNode, useReducer } from "react";
import { combineReducers } from "../utils";
import { PokemonAction } from "./pokemon/reducer";
import { pokemonIntialState, pokemonReducer } from "./pokemon";
import { PokemonState } from "./pokemon/state";
import { AppContext } from "./AppContext";

const initialState = {
  pokemon: pokemonIntialState,
};

type Props = {
  children: ReactNode;
};

export type State = {
  pokemon: PokemonState;
};

const rootReducer = combineReducers<State, PokemonAction>({
  pokemon: pokemonReducer,
});

function AppProvider({ children }: Props) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
