type Reducer<S, A> = (state: S, action: A) => S;

export type ReducersMapObject<State, Action> = {
  [K in keyof State]: Reducer<State[K], Action>;
};

function combineReducers<State, Action>(
  reducers: ReducersMapObject<State, Action>
): Reducer<State, Action> {
  return (state: State, action: Action): State => {
    const newState = {} as State;

    for (const key in reducers) {
      const reducer = reducers[key];
      const prevStateForKey = state[key];
      newState[key] = reducer(prevStateForKey, action);
    }

    return newState;
  };
}

export default combineReducers;
