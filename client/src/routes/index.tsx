import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/road/measurement" replace />,
    },
    {
      path: '/car',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/car/data" replace />, index: true },
        { path: 'data', element: <CarData /> }
      ],
    },
    {
      path: '/road',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/road/measurement" replace />, index: true },
        { path: 'measurement', element: <RoadMeasurement /> },
        { path: 'condition', element: <RoadCondition /> },
        { path: 'altitude', element: <RoadAltitude /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const RoadMeasurement = Loadable(lazy(() => import('../pages/RoadMeasurement')));
const RoadCondition = Loadable(lazy(() => import('../pages/RoadCondition')));
const RoadAltitude = Loadable(lazy(() => import('../pages/RoadAltitude')));
const CarData = Loadable(lazy(() => import('../pages/CarData')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
