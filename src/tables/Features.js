import moment from "moment"
import {useEffect, useState} from "react";
import {MyDialog} from "../utils/MyDialog";
import {DialogTitle} from "@material-ui/core";
import {IoMdClose} from "react-icons/io";
import InputForm from "../forms/InputForm";
import Dialog from "@material-ui/core/Dialog";
import RecursiveProperty from "../components/RecursiveProperty";
import styled from "styled-components";
export const FeatureComponent = styled.div`
    width: 50vw;
    max-height: 50vh;
    overflow-y: auto; 
    margin-left: .8em;
    margin-bottom: 1em;
`;
export default function FeatureTable({features}) {
    const [detailsDialogShown, setDetailsDialogShown] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const handleCloseDialog = (event, reason) => {
        if (reason !== "backdropClick") {
            setDetailsDialogShown(false);
        }
    }

    const handleSelecFeature = feature => {
        setSelectedFeature(feature);
    }

    useEffect(() => {
        if (selectedFeature === null) setDetailsDialogShown(false)
        else setDetailsDialogShown(true);
    }, [selectedFeature]);
    return(
        <div className={"table-div m-3"}>
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
                        <td><small>{i+1}</small></td>
                        <td><small>{feature.properties.name}</small></td>
                        <td><small>{moment(feature.properties.created_on).format('Y-MM-DD HH:mm')}</small></td>
                        <td><small>{feature.properties.description}</small></td>
                        <td><small><span className={"badge badge-primary border pointer text-black-50"} onClick={() => handleSelecFeature(feature)}>More details</span></small></td>
                    </tr>
                )}
                </tbody>
            </table>
            <Dialog
                open={detailsDialogShown}
                onClose={handleCloseDialog}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">

                <DialogTitle className={"bg-light"}>
                    <span className={"d-flex"}>{selectedFeature?.properties.name.toUpperCase()}<small className={"ms-auto"}>
                        <IoMdClose onClick={() => setDetailsDialogShown(false)} /></small></span>
                </DialogTitle>
                <FeatureComponent>
                    <RecursiveProperty
                        property={selectedFeature?.properties}
                        propertyName={selectedFeature?.properties.name}
                        excludeBottomBorder={false}
                        rootProperty={false}/>
                </FeatureComponent>
            </Dialog>
        </div>
    )
}