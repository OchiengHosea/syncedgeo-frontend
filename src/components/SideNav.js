import {Link} from "react-router-dom";
import "./sidenav.scss";
import {MdOutlineHome, MdOutlineDashboard, MdInput} from "react-icons/md";
import {GiProcessor} from "react-icons/gi";
import {BsFillGeoFill} from "react-icons/bs";

export default function SideNav(){
    return(
        <div id={"sidenav"}>
            <div className={"bg-strong-blue text-white text-center p-2 pt-5 pb-5 brand-div"}>
                <h5 id={"brand-name"}>Synced Geo</h5>
            </div>
            <div className={"sidenav"}>
                <div>
                    <Link to={"/"}>
                        <span><MdOutlineHome /></span>
                        <span>Home</span>
                    </Link>
                </div>
                <div>
                    <Link to={"/dashboard"}>
                        <span><MdOutlineDashboard /></span>
                        <span>Dashboard</span>
                    </Link>
                </div>
                <div>
                    <Link to={"/inputs"}>
                        <span><MdInput /></span>
                        <span>Inputs</span>
                    </Link>
                </div>
                <div>
                    <Link to={"/processors"}>
                        <span><GiProcessor /></span>
                        <span>Processors</span>
                    </Link>
                </div>
                <div>
                    <Link to={"/geofences"}>
                        <span><BsFillGeoFill /></span>
                        <span>Geo-Fences</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}