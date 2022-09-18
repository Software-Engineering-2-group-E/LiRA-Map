import { FC } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from './Components/Navbar'
import RoadMeasurements from "./pages/RoadMeasurements";
import RoadConditions from "./pages/RoadConditions";
import Altitude from "./pages/Altitude";
import CarData from "./pages/CarData";
import Login from "./pages/Login";

import "./App.css";

const App: FC = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <div>
                        <Navbar/>
                        <Route exact path="/cardata" component={CarData} />
                        <Route path="/road_measurements" component={RoadMeasurements} />
                        <Route path="/road_conditions" component={RoadConditions} />
                        <Route path="/altitude" component={Altitude} />
                    </div>
                </Switch>
            </Router>
        </div>
    );
}

export default App;