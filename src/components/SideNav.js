import {Link} from "react-router-dom";
import "./sidenav.scss";

export default function SideNav(){
    return(
        <div className={"sidenav"}>
            <div className={"bg-light p-2 pt-3 pb-3 brand-div"}>
                <span>Synced Geo</span>
            </div>
            <div>
                <Link to={"/"}><span>Home</span></Link>
            </div>
            <div>
                <Link to={"/dashboard"}><span>Dashboard</span></Link>
            </div>
            <div>
                <Link to={"/inputs"}><span>Inputs</span></Link>
            </div>
            <div>
                <Link to={"/processors"}><span>Processors</span></Link>
            </div>
            <div>
                <Link to={"/geofences"}><span>Geo-Fences</span></Link>
            </div>
        </div>
    );
}