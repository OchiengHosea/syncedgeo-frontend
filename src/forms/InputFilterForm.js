import {HiOutlineSearchCircle} from "react-icons/hi";

export default function InputFilterForm() {
    return(
        <form>
            <span className={"input-group"}>
                <input className={"form-control form-control-sm"} name={"name"} type={"text"} placeholder={"name"}/>
                <input className={"form-control form-control-sm"} name={"created_on_start_date"} type={"datetime-local"} placeholder={"Created On - From"}/>
                <input className={"form-control form-control-sm"} name={"created_on_end_date"} type={"datetime-local"} placeholder={"Created On - To"}/>
                <button className={"btn btn-sm border"}><HiOutlineSearchCircle className={"me-2"}/> Search</button>
            </span>
        </form>
    );
}