import { PageViewType } from "../../type/global";

export type ConfigState = {
  pageView: PageViewType;
};

const configInitialState: ConfigState = {
  pageView: "single",
};

export default configInitialState;
