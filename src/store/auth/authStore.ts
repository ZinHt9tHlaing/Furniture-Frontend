import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export enum Status {
  otp = "otp",
  confirm = "confirm", // for confirm password
  verify = "verify", // for confirm and forgot password
  reset = "reset", // for forgot password
  none = "none",
}

type State = {
  phone: string | null;
  token: string | null;
  status: Status;
  isMounted: boolean;
};

const initialState: State = {
  phone: null,
  token: null,
  status: Status.none,
  isMounted: false,
};

type ActionStates = {
  setAuth: (phone: string, token: string, status: Status) => void;
  clearAuth: () => void;
  setIsMounted: (isMounted: boolean) => void;
};

const useAuthStore = create<State & ActionStates>()(
  persist(
    immer((set) => ({
      ...initialState,
      setAuth: (phone, token, status) =>
        set((state) => {
          state.phone = phone;
          state.token = token;
          state.status = status;
        }),
      //   clearAuth: () => {
      //     set((state) => {
      //       state.phone = null;
      //       state.token = null;
      //       state.status = Status.none;
      //     });
      //   },
      clearAuth: () => set(initialState),
      setIsMounted: (isMounted: boolean) =>
        set((state) => {
          state.isMounted = isMounted;
        }),
    })),
    {
      name: "auth-credential", // key for sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
