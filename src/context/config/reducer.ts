import { PageViewType } from "../../type/global";
import { CombinedReducerAction } from "../AppProvider";
import { ConfigState } from "./state";

export type ConfigSetPageView = {
  type: "SET_PAGE_VIEW";
  payload: {
    pageView: PageViewType;
  };
};

export type ConfigReducerAction = ConfigSetPageView;

const configReducer = (
  state: ConfigState,
  action: CombinedReducerAction
): ConfigState => {
  switch (action.type) {
    case "SET_PAGE_VIEW":
      return {
        ...state,
        pageView: action.payload.pageView,
      };
    default:
      return state;
  }
};

export default configReducer;
