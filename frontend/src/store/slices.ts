import { StateCreator } from "zustand";
import { userType } from "./types";

export const user: StateCreator<userType> = (set) => ({
  isLogged: false,
  setIsLogged: (isLogged: boolean) => set({ isLogged }),
  userLogged: null,
  setUserLogged: (userLogged) => set({ userLogged }),
  isLoadingUser: true,
  setIsLoadingUser: (isLoadingUser) => set({ isLoadingUser }),
});
