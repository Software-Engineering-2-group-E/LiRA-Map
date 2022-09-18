// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function RoadCondition() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Road Condition">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Road Condition
        </Typography>

      </Container>
    </Page>
  );
}
