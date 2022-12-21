import { Models } from "@rematch/core";
import { rides } from "./ride";
import { access } from "./user";
import { altitude } from "./altitude";

export interface RootModel extends Models<RootModel> {
  access: typeof access;
  rides: typeof rides;
  altitude: typeof altitude;
}

export const models: RootModel = {
  access: access,
  rides: rides,
  altitude: altitude,
};
