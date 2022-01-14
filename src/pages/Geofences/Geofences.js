import * as turf from "@turf/turf";

import useFetch from "../../services/useFetch";
import {urls} from "../../services/urls";
import {ErrorLoading, Loader} from "../../utils/Loaders";
import {useState} from "react";
import "./geofences.scss"
export default function Geofences() {
    const [geofenceWebSocket, setGeofenceWebSocket] = useState(null);
    const {data: geofences, loading, error} = useFetch(urls.geofencesUrl);
    console.log(geofences);
    const extractOrigin = (name) => {
        const data = name.split("_");
        return <small>{data[1]}, {data[2]}</small>;
    }

    const extractCentroid = (feature) => {
        console.log(feature);
        const poly = turf.polygon(feature.geometry.coordinates, feature.properties);
        console.log(turf.centroid(poly));
    }

    const extractArea = (feature) => {
        const poly = turf.polygon(feature);
        return turf.area(poly);
    }

    const extractPerimeter = (feature) => {
        const poly = turf.polygon(feature);
        return turf.length(poly);
    }

    const onGeoFenceMessage = (message) => {
        console.log("New Message");
        console.log(message.data);
    }

    const onGeoFenceClose = () => {
        console.log("closing");
        // geofenceWebSocket.close();
    }

    const onGeoFenceConnect = () => {
        console.log("connected!");
    }

    const subscribeToGeofence = (feature) => {
        extractCentroid(feature)
        if (geofenceWebSocket){
            // close the current websocket and open a new one again
        } else {
            const geoWs = new WebSocket(urls.geofenceWebSocketUrl);
            setGeofenceWebSocket(geoWs);
            geoWs.onmessage = onGeoFenceMessage;
            geoWs.onclose = onGeoFenceClose;
            geoWs.onopen = (onopen) => {
                geoWs.send(JSON.stringify({data:{geofence_id:"83f65f6d-b871-45f7-ae7e-980c8200a2b9"}}))
            };
        }
    }

    if (loading) return <Loader />
    if (error) return <ErrorLoading allowReload={true} />
    return(
        <div className={"animate-entry"}>
            <div>
                <h3>Geo-fences</h3>
            </div>
            <div className={"col-12 m-0 p-0"}>
                <div className={"border m-3 p-2 geofence-table-div"}>
                    <table className={"table table-sm table-responsive m-2 p-2"}>
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Created on</th>
                            <th>Origin</th>
                            <th>Radius</th>
                            <th>Area</th>
                            <th>Perimeter</th>
                            <th>Units</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {geofences?.features.map((feature, i) =>
                            <tr key={feature.id} onClick={() => subscribeToGeofence(feature)}>
                                <td>{i+1}</td>
                                <td>{feature.properties.created_on}</td>
                                <td>{extractOrigin(feature.properties.name)}</td>
                                <td>{feature.properties.rad}</td>
                                <td>{extractArea(feature)}</td>
                                <td>{extractPerimeter(feature)}</td>
                                <td>{feature.properties.units}</td>
                                <td>{feature.properties.is_active? "Active" : "Inactive"}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={"container-fluid row m-0 p-0"}>
                <div className={"col-xl-3 col-lg-4 col-md-5 col-sm-12 col-xs-12 m-0 p-0"}>
                    <div className={"m-2 p-2"}>
                        <div className={"geofence-summary border shadow-sm p-3 d-flex"}>
                            <div className={"m-auto responsive-text"}>
                                <div className={"text-center"}>
                                    <div>18</div>
                                    <div>Total Features</div>
                                </div>
                                <hr />
                                <div className={"text-center feature-summary"}>
                                    <small><span>2</span>Points</small>
                                    <small><span>12</span>Lines</small>
                                    <small><span>21</span>Polygons</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-xl-9 col-lg-8 col-md-7 col-sm-12 col-xs-12 m-0 p-0"}>
                    <div className={"m-2 mt-3"}>
                        <div className={"m-2 p-2 border rounded-3 shadow-sm"}>
                            <h5>Points</h5>
                        </div>
                        <div className={"m-2 p-2 border rounded-3 shadow-sm"}>
                            <h5>Lines</h5>
                        </div>
                        <div className={"m-2 p-2 border rounded-3 shadow-sm"}>
                            <h5>Polygons</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}