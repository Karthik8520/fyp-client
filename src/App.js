import {BrowserRouter, Route, Switch} from "react-router-dom"
import LoginPage from "./components/page/Login.page"
import TollBoothPage from "./components/page/Toll-Booth.page"
import PoliceStationPage from "./components/page/Police-station.page"
import VehiclePage from "./components/page/Vehicle.page"
import AlertsPage from "./components/page/AlertsPage"
import OTPpage from "./components/page/OTPverfication.page"


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/stationPage" component={PoliceStationPage} />
          <Route exact path="/tollPage" component={TollBoothPage} />
          <Route exact path="/vehicle/:number" component={VehiclePage} />
          <Route exact path="/alerts" component={AlertsPage} />
          <Route exact path="/otp" component={OTPpage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
