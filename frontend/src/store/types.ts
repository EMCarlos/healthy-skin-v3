import { AuthUser } from "@/types";

export type userType = {
  isLogged: boolean;
  setIsLogged: (isLogged: userType["isLogged"]) => void;
  userLogged: AuthUser | null; //TODO
  setUserLogged: (userLogged: userType["userLogged"]) => void;
  isLoadingUser: boolean;
  setIsLoadingUser: (isLoadingUser: userType["isLoadingUser"]) => void;
};

export type GeneralStore = userType;
