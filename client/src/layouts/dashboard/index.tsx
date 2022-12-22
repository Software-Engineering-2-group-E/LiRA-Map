//@Author(s) s184230

import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// @mui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// config
import { NAVBAR } from "../../config";
import NavbarVertical from "./navbar/NavbarVertical";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { isValidToken } from "../../utils/jwt";
import LoadingIcon from "../../components/LoadingIcon";

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,

  ...(collapseClick && {
    marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
  }),
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { loading } = useSelector(
    (rootState: RootState) => rootState.loading.global
  );
  const { userCredentials } = useSelector((state: RootState) => state.access);
  const { collapseClick, isCollapsed } = useCollapseDrawer();
  const [open, setOpen] = useState(true);

  if (!isValidToken(userCredentials?.user?.stsTokenManager?.accessToken)) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        // display: { lg: 'flex' },
        // minHeight: { lg: 1 },
      }}
    >
      {loading && <LoadingIcon />}
      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
