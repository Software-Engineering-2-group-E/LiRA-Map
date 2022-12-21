//@Author(s) s184230

import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import storage from "redux-persist/lib/storage";
import persist from "@rematch/persist";

type FullModel = ExtraModelsFromLoading<RootModel, { type: "full" }>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [
    persist({
      key: "persist-storage",
      storage,
      whitelist: ["access"], // Models to persist
    }),
    loadingPlugin({ type: "full" }),
  ],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
