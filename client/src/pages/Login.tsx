//@Author s175182, s184230

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Page from "../components/Page";
import { Dispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {useMemo} from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();

  const { loading, success, error } = useSelector(
    (rootState: RootState) => rootState.loading.models.access
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginObject = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    await dispatch.access.login(loginObject);
  };

  useMemo(() => {
    console.log(success);
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <Page title="Log in">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, width: 100, height: 100 }}>
            <Logo sx={{ m: 1, width: 100, height: 100 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
