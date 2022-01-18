import * as turf from "@turf/turf";

import useFetch from "../../services/useFetch";
import {urls} from "../../services/urls";
import {ErrorLoading, Loader} from "../../utils/Loaders";
import {useEffect, useState} from "react";
import "./geofences.scss"
import axios from "axios";
import FeatureTable from "../../tables/Features";
export default function Geofences() {
    const [geofenceWebSocket, setGeofenceWebSocket] = useState(null);
    const {data: geofences, loading, error} = useFetch(urls.geofencesUrl);
    const [geofencePoints, setGeofencePoints] = useState(null);
    const [geofenceLines, setGeofenceLines] = useState(null);
    const [geofencePolygons, setGeofencePolygons] = useState(null);

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
        extractCentroid(feature);
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

    const getgeofenceGeneralStatistics = () => {
        const statistics = {
            total:0
        }
        if (geofencePoints !== null) statistics.total += geofencePoints.features.length;
        if (geofencePolygons !== null) statistics.total += geofencePolygons.features.length;
        if (geofenceLines !== null) statistics.total += geofenceLines.features.length

        return statistics;
    }

    useEffect(async () => {
        if (geofenceWebSocket){
            const points = (await axios.get(urls.featureInputsUrl, {params: {input_type: "Point"}})).data;
            const lines = (await axios.get(urls.featureInputsUrl, {params: {input_type: "LineString"}})).data;
            const polygons = (await axios.get(urls.featureInputsUrl, {params: {input_type: "Polygon"}})).data;
            setGeofencePoints(points);
            setGeofenceLines(lines);
            setGeofencePolygons(polygons);
        }
    }, [geofenceWebSocket]);

    const geofenceSummary = <>
        {(geofencePoints || geofenceLines || geofencePolygons) && <div className={"m-auto responsive-text"}>
            <div className={"text-center"}>
                <div>{getgeofenceGeneralStatistics().total}</div>
                <div>Total Features</div>
            </div>
            <hr />
            <div className={"text-center feature-summary"}>
                {/*<small><span>2</span>Points</small>*/}
                {/*<small><span>12</span>Lines</small>*/}
                {/*<small><span>21</span>Polygons</small>*/}
                <small>Within this geofence</small>
            </div>
        </div> }
    </>

    if (loading) return <Loader />
    if (error) return <ErrorLoading allowReload={true} />
    return(
        <div className={"animate-entry"}>
            <div className={"bg-light p-2"}>
                <div className={""}>
                    <h3 className={"text-strong-blue"}>Geo-fences</h3>
                </div>
                <div className={"col-12 m-0 p-0"}>
                    <div className={"border m-3 table-div bg-white shadow-sm rounded-3"}>
                        <table className={"table table-sm table-hover table-responsive p-2"}>
                            <thead className={"bg-strong-blue text-white"}>
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
                            <tbody className={"p-3"}>
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
            </div>
            <div className={"container-fluid row m-0 p-0"}>
                <div className={"col-xl-3 col-lg-4 col-md-5 col-sm-12 col-xs-12 m-0 p-0"}>
                    <div className={"m-2 p-2"}>
                        <div className={"geofence-summary border shadow-sm p-3 d-flex bg-white"}>
                            {geofenceWebSocket ? geofenceSummary : <div className={"text-center d-flex"}><h4 className={"m-auto"}>Select a Geofence to view its summary</h4></div>}
                        </div>
                    </div>
                </div>
                <div className={"col-xl-9 col-lg-8 col-md-7 col-sm-12 col-xs-12 m-0 p-0"}>
                    <div className={"m-2 mt-3"}>
                        {geofencePoints && <div className={"geofence-features-div m-2 p-2 border rounded-3 shadow-sm bg-white"}>
                            <FeatureTable features={geofencePoints}/>
                        </div>}
                        {geofenceLines && <div className={"geofence-features-div m-2 p-2 border rounded-3 shadow-sm bg-white"}>
                            <FeatureTable features={geofenceLines} />
                        </div>}
                        {geofencePolygons && <div className={"geofence-features-div m-2 p-2 border rounded-3 shadow-sm bg-white"}>
                            <FeatureTable features={geofencePolygons} />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}