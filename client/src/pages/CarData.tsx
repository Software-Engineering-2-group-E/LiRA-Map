// @mui
import {Container, Typography} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function CarData() {
    const {themeStretch} = useSettings();

    return (
        <Page title="Car Data">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    Car Data
                </Typography>
            </Container>
        </Page>
    );
}

export interface SegTypes {
    dataType: string | undefined;
    aggrType: string | undefined;
    direction: number | undefined;
}

// const OldCarData = () => {
//
//     const [boundaries, setBoundaries] = useState<LatLng[]>([
//         new LatLng(55.523966596348956, 12.030029296875002),
//         new LatLng(55.523966596348956, 12.74620056152344),
//         new LatLng(55.8089989927049, 12.74620056152344),
//         new LatLng(55.8089989927049, 12.030029296875002)
//     ])
//
//     return (
//         <SegmentProvider>
//             <div className="ml-wrapper">
//                 <MapWrapper>
//                     <Segments boundaries={boundaries}/>
//                     <MapEvents setBoundaries={setBoundaries}></MapEvents>
//                 </MapWrapper>
//             </div>
//         </SegmentProvider>
//     );
// }