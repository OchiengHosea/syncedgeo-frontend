import {useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import * as turf from "@turf/turf";
import {handleFormServerError, SuccessError} from "../utils/widgets";
import axios from "axios";
import {urls} from "../services/urls";

export default function InputForm() {
    const [successMessage, setSuccessMessage] = useState(null);
    const [serverErrors, setServerErrors] = useState();
    const [loading, setLoading] = useState(false);
    const fileInput = useRef(null);
    const [fileErrors, setFileErrors] = useState([]);
    const [features, setFeatures] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (file && features) {
            console.log(features);
            setLoading(true);
            setServerErrors([]);
            setSuccessMessage(null);
            axios.post(urls.featureInputsUrl, features).then(res => {
                setTimeout(() => {
                    setLoading(false);
                    setServerErrors([]);
                    setSuccessMessage(null);
                    // handleCloseBeaconForm(false);
                }, 2000);
            }).catch(err => {
               setSuccessMessage(null);
               // handleFormServerError(err, setLoading, setServerErrors);
                setTimeout(() => {
                    setLoading(false);
                    setSuccessMessage(null);
                    setServerErrors(["Ensure that your geojson is valid and every feature has name and description in its properties"]);
                }, 2000);
            });
        }
    }
    const handleFileInput = (e) => {
        if (e.target.files.length > 0){
            const uploadedFile = e.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = function() {
                try {
                    const fts = JSON.parse(fileReader.result);
                    setFeatures(fts);
                    setFile(uploadedFile);
                } catch (e) {
                    setFileErrors(["Invalid or corrupted contents"]);
                }
            };
            fileReader.readAsText(uploadedFile);
        } else {
            setFileErrors(["No file selected"])
        }
    }

    return(
        <div id="file-uploader">
            <input accept={".json, .geojson"} ref={fileInput} type="file" onChange={handleFileInput} style={{display:"none"}} />

            <div onClick={e => fileInput.current && fileInput.current.click()} className="m-5 dropzone pointer">Click to select geojson file or drop here</div>
            <div className={"text-center"}>
                <small className={"text-black-50"}>{file?.name}</small>
            </div>

            <div className={"text-center p-2 text-danger"}>
                {fileErrors && <SuccessError errors={fileErrors} />}
                {serverErrors && <SuccessError errors={serverErrors} /> }
            </div>

            <div className={"text-center p-2 text-success"}>
                {successMessage && <SuccessError success={successMessage} /> }
            </div>

            <div className={"text-center align-content-center p-4"}>
                <button type="submit" className={"btn btn-sm btn-primary text-white"} onClick={handleSubmit}>
                    {loading ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>: null}
                    Submit</button>
            </div>
        </div>
    );
}