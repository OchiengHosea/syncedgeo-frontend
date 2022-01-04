import {useEffect} from "react";
import useFetch from "../services/useFetch";
import {urls} from "../services/urls";
export default function Geofences() {
    const {data: geofences, loading, error} = useFetch(urls.geofencesUrl);
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    return(
        <div>
            <span className={"display-4"}>{geofences.features.length} Geo-fences</span>
        </div>
    )
}