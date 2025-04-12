import { createContext, Dispatch, useContext } from "react";
import { PokemonAction } from "./pokemon/reducer";
import { State } from "./AppProvider";

type AppContextType = {
  state: State;
  dispatch: Dispatch<PokemonAction>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
