import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import createSelectors from "./createSelectors";
import { cart, checkout, favorites, user } from "./slices";
import { GeneralStore } from "./types";

const useGeneralStoreBase = create<GeneralStore>()(
  persist(
    devtools(
      (...SetGet) => ({
        ...user(...SetGet),
        ...favorites(...SetGet),
        ...cart(...SetGet),
        ...checkout(...SetGet),
      }),
      {
        name: "General Store",
      }
    ),
    {
      name: "general-store",
    }
  )
);

const useGeneralStore = createSelectors(useGeneralStoreBase);

export default useGeneralStore;
