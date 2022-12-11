import React, { FC } from "react";
import MetaData from "./MetaData";

import { useMetasCtx } from "../../context/MetasContext";
import { RideMeta } from "../../models/models";
import { Stack } from "@mui/material";
import { ActiveMeasProperties } from "../../models/properties";

const RideDetails: FC = () => {
  const { selectedMetas } = useMetasCtx();

  return (
    <Stack
      className="meta-data"
      overflow={"scroll"}
      style={{
        position: "absolute",
        left: 188,
        height: "100vh", //400 TODO: someone wants to do something here but didn't write what
        //backgroundColor: "white",
        zIndex: 500,
      }}
    >
      {selectedMetas.map((meta: RideMeta, i: number) => (
        <MetaData md={meta} key={`md-${Math.random()}`} />
      ))}
    </Stack>
  );
};

export default RideDetails;
