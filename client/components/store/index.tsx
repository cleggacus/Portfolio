import { createContext, useReducer, useEffect, FC } from "react";
import { StoreContextT, StoreT } from "../../interfaces/store";
import { setLocalTheme, defaultTheme } from "../../utils/theme";
import Reducer from "./reducer";

export const initialState: StoreT = {
  theme: defaultTheme,
};

export const StoreContext = createContext<StoreContextT>([initialState, () => { }]);

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => setLocalTheme(), []);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
};