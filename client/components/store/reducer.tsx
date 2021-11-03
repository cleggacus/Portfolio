import { PayloadT, StoreT, ActionT, ActionTypes } from "../../interfaces/store";
import { setLocalTheme } from "../../utils/theme";

const setTheme = (state: StoreT, payload: PayloadT) => {
  setLocalTheme(payload);

  return {
    ...state,
    theme: payload
  };
}

const Reducer = (state: StoreT, action: ActionT): StoreT => {
  switch (action.type) {
    case ActionTypes.SetTheme:
      return setTheme(state, action.payload)
    default:
      return state;
  }
};

export default Reducer;