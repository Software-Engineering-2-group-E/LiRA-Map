import { Models } from "@rematch/core";
import { rides } from "./ride";
import {access} from "./user";

export interface RootModel extends Models<RootModel> {
    access: typeof access;
    rides: typeof rides;
}

export const models: RootModel = { access: access, rides: rides };
