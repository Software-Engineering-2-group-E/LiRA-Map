import React, { FC } from "react";
import MetaData from "./MetaData";

import { useMetasCtx } from "../../context/MetasContext";
import { RideMeta } from "../../models/models";
import { Stack } from "@mui/material";

const RideDetails: FC = () => {
  const { selectedMetas } = useMetasCtx();

  return (
    <Stack
      className="meta-data"
      style={{
          height: window.innerHeight - 230,
          overflowX: 'hidden',
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
