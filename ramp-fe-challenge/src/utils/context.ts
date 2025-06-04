import { createContext } from "react";

export const AppContext = createContext<AppContextProps>({
  setError: () => {},
  transactionApprovals: new Map(),
  setTransactionApprovals: () => {},
});

type AppContextProps = {
  setError: (error: string) => void;
  cache?: React.MutableRefObject<Map<string, string>>;
  transactionApprovals: Map<string, boolean>;
  setTransactionApprovals: React.Dispatch<
    React.SetStateAction<Map<string, boolean>>
  >;
};
