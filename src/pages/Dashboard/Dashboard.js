import MyMap from "../../map/Map";
import {MapContainer, TileLayer} from "react-leaflet";

export default function Dashboard() {
    return(
        <div>
            <div className={"p-2"}>
                <span className={"display-5"}>Garmic Fleet Managers</span>
            </div>
            <div className={"container-fluid row m-0 p-0"}>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Inputs</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Processors</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Geofences</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Live Objects</span>
                    </div>
                </div>
            </div>
            <div id={"live-objects-heatmap"}>
                <MyMap height={"600px"}/>
            </div>
        </div>
    );
}