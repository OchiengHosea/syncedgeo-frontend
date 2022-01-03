import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Processor from "./pages/Processor";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Processor />} />
        </Routes>
    </div>
  );
}

export default App;
