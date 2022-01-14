import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Processors from "./pages/Processors";
import Geofences from "./pages/Geofences/Geofences";
import Inputs from "./pages/Inputs/Inputs";
import Dashboard from "./pages/Dashboard";
import SideNav from "./components/SideNav";
import InputForm from "./forms/InputForm";

function App() {
  return (
    <div className="App">
        <div className={"d-flex"}>
            <div style={{width:220}}>
                <SideNav></SideNav>
            </div>
            <div className={"w-100 data-pane"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inputs" element={<Inputs />} />
                    <Route path="/processors" element={<Processors />} />
                    <Route path="/geofences" element={<Geofences />} />
                    <Route path={"/newinput"} element={<InputForm />}/>
                </Routes>
            </div>
        </div>
    </div>
  );
}

export default App;
