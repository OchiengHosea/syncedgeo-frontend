import {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as turf from "@turf/turf";

export default function InputForm() {
    const fileInput = useRef(null);
    const [fileErrors, setFileErrors] = useState([]);
    const [features, setFeatures] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = () => {

    }
    const handleFileInput = (e) => {
        if (e.target.files.length > 0){
            const uploadedFile = e.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = function() {
                try {
                    const fts = turf.featureCollection(JSON.parse(fileReader.result), {});
                    setFeatures(fts);
                    setFile(uploadedFile);
                } catch (e) {
                    setFileErrors([...fileErrors, "Invalid or corrupted contents"])
                }
            };
            fileReader.readAsText(uploadedFile);
        } else {
            setFileErrors([...fileErrors, "No file selected"])
        }
    }

    return(
        <div className="file-uploader">
            <input accept={".json, .geojson"} ref={fileInput} type="file" onChange={handleFileInput} style={{display:"none"}}/>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-secondary m-5">Select File</button>
            <div>
                <button className={"btn btn-primary"} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}