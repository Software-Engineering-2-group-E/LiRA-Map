//Author(s) s184234, s204442, s204433, s184230

import React, { FC } from "react";
import MetaData from "./MetaData";

import { useMetasCtx } from "../../context/MetasContext";
import { RideMeta } from "../../models/models";
import { Stack } from "@mui/material";

const RideDetails: FC<{height: number}> = ({height}) => {
  const { selectedMetas } = useMetasCtx();

  return (
    <Stack
      className="meta-data"
      style={{
          height: height - 230,
          overflowX: 'hidden',
          zIndex: 500,
      }}
    >
      {selectedMetas.map((meta: RideMeta, _: number) => (
        <MetaData md={meta} key={`md-${Math.random()}`} />
      ))}
    </Stack>
  );
};

export default RideDetails;
