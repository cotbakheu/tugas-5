import { ReactNode, useReducer } from "react";
import { combineReducers } from "../utils";
import { PokemonAction } from "./pokemon/reducer";
import { pokemonIntialState, pokemonReducer } from "./pokemon";
import { PokemonState } from "./pokemon/state";
import { AppContext } from "./AppContext";
import { configReducer } from "./config";
import { ConfigReducerAction } from "./config/reducer";
import configInitialState, { ConfigState } from "./config/state";

export type State = {
  pokemon: PokemonState;
  config: ConfigState;
};

const initialState: State = {
  pokemon: pokemonIntialState,
  config: configInitialState,
};

type Props = {
  children: ReactNode;
};

export type CombinedReducerAction = PokemonAction | ConfigReducerAction;

const rootReducer = combineReducers<State, CombinedReducerAction>({
  pokemon: pokemonReducer,
  config: configReducer,
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
