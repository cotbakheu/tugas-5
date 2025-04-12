export type GetAllPokemonParams = {
  limit: number;
  offset: number;
};

export type PokemonListData = {
  name: string;
  url: string;
};

export type GetAllPokemonResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonListData[];
};

export type PokemonDetails = {
  name: string;
  order: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
        front_shiny: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: {
    slot: 1;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonPagination = {
  page: number;
  pageCount: number;
  totalData: number;
};
