import axios from "axios";
import useFetch from "../services/useFetch";
import {urls} from "../services/urls";
import OverviewFlow from "./Overview";

function Model({model}) {
    const name = Object.keys(model)[0]
    return(
        <div>
            <p>{name}</p>
        </div>
    );
}

export default function Processor(){
    const {data: processorInputs, loading, error} = useFetch(urls.geoprocessorsUrl);
    if (loading) return <div>Loading</div>
    if (error) return <div>Error</div>
    console.log(processorInputs);
    return(
        <div>
            <h4>Build your processor here</h4>
            <hr />
            <div style={{width: "100%", height: 800}}>
                <OverviewFlow />
            </div>
            {/*{processorInputs.models.map(val => <Model key={processorInputs.models.indexOf(val)} model={val}/>)}*/}
        </div>
    );
}