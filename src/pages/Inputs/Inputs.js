import {urls} from "../../services/urls";
import {useEffect, useState} from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import { DialogTitle } from "@material-ui/core";
import {IoMdClose} from 'react-icons/io';
import {VscActivateBreakpoints} from 'react-icons/vsc';
import {MdOutlineLinearScale} from 'react-icons/md';
import {FaDrawPolygon} from 'react-icons/fa';
import {IoCloudUpload} from 'react-icons/io5';
import InputForm from "../../forms/InputForm";
import "./input.scss";
import {ErrorLoading, Loader} from "../../utils/Loaders";
import useFetch from "../../services/useFetch";

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
            axios
                .get(urls.featureInputsUrl, {params: params})
                .then(res => {
                    setTimeout(() => {
                        setFeatures(res.data);
                        setLoading(false);
                    }, 2000);
                })
                .catch(err => {
                    setTimeout(() => {
                        setLoading(false);
                        setServerErrors(["An error occurred"]);
                    }, 2000);
                })
        }
    }, [params]);
    if (loading) return <Loader/>
    if (serverErrors) return <ErrorLoading allowReload={true} />
    return(
            <div className={"animate-entry"}>
                <div className={"feature-input-select m-2"}>
                    {featureTypes.map(type =>
                        <span key={type}
                              className={"feature-input-type badge text-primary rounded-3 pointer border me-2"}
                              onClick={() => setFeatureType(type)}>
                        <span className={"text-black-50"}>
                            {type === "Point" && <VscActivateBreakpoints />}
                            {type === "LineString" && <MdOutlineLinearScale />}
                            {type === "Polygon" && <FaDrawPolygon />}
                        </span>

                        <span className={"ms-2"}>{type}</span>
                    </span>)}
                </div>

                <div>
                    <div className={"m-2"}>
                        <span
                            className={"badge badge-sm text-black-50 pointer"}
                            onClick={() => setInputFormOpen(true)}>
                            <span className={"text-black-50 me-2"}>{<IoCloudUpload />}</span>
                            Upload features
                        </span>
                    </div>

                    <div className={"text-center m-2"}>
                        <span className={"text-info"}>{features?.features.length === 0 && "No features uploaded yet!"}</span>
                    </div>

                    <div className={"table-div border m-3 p-2"}>
                        <table className={"table table-sm table-responsive"}>
                            <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Created on</th>
                                <th>Description</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {features?.features.map((feature, i) =>
                                <tr key={feature.id}>
                                    <td>{i+1}</td>
                                    <td>{feature.properties.name}</td>
                                    <td>{feature.properties.created_on}</td>
                                    <td>{feature.properties.description}</td>
                                    <td>{JSON.stringify(feature.properties.data)}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
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