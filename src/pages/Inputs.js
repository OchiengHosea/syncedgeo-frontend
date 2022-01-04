import useFetch from "../services/useFetch";
import {urls} from "../services/urls";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function Inputs() {
    const [featureType, setFeatureType] = useState("Point");
    const [params, setParams] = useState({});
    const featureTypes = ["Point", "LineString", "Polygon"];
    const [features, setFeatures] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setParams({input_type:featureType});
    }, [featureType]);
    useEffect(() => {
        setLoading(true);
        if (featureType) {

            axios.get(urls.featureInputsUrl, {params: params}).then(res => {
                console.log(res.data);
                setFeatures(res.data);
                setLoading(false);
            }).catch(err => {
                setError(["An error occurred"]);
            })
        }
    }, [params]);
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return(
        <div>
            <div className={"feature-input-select"}>
                {featureTypes.map(type => <div key={type} className={"feature-input-type"} onClick={() => setFeatureType(type)}>{type}</div>)}
            </div>

            <div>
                <div>
                    <Link to={"/newinput"}>Upload Input</Link>
                </div>
                <span className={"display-5"}>{features.features.length}</span>
            </div>
        </div>
    );
}