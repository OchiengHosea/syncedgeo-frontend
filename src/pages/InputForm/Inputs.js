import useFetch from "../../services/useFetch";
import {urls} from "../../services/urls";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from "@material-ui/core";
import {IoMdClose} from 'react-icons/io';
import InputForm from "../../forms/InputForm";
import "./input.scss";

export default function Inputs() {
    const [featureType, setFeatureType] = useState("Point");
    const [params, setParams] = useState({});
    const featureTypes = ["Point", "LineString", "Polygon"];
    const [features, setFeatures] = useState(null);
    const [error, setError] = useState(null);
    const [serverErrors, setServerErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inputFormIsOpen, setInputFormOpen] = useState(false);

    const handleCloseInputForm = (action, reason) => {
        if (reason !== "backdropClick") {
            setInputFormOpen(false);
        }
    }

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
                    <span className={"badge badge-sm text-black-50"} onClick={() => setInputFormOpen(true)}>Add input</span>
                </div>

                <span className={"display-5"}>{features.features.length}</span>
            </div>

            <Dialog
                open={inputFormIsOpen}
                onClose={handleCloseInputForm}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">

                <DialogTitle className={"bg-light"}>
                    <span className={"d-flex"}>Upload Features<small className={"ms-auto"}>
                        <IoMdClose onClick={() => setInputFormOpen(false)} /></small></span>
                </DialogTitle>

                <InputForm />
            </Dialog>
        </div>
    );
}