import MyMap from "../../map/Map";
import RecursiveProperty from "../../components/RecursiveProperty";
import "./dashboard.scss";
const testJson = {
    "_id": "5bc32f3f5fbd8ad01f8265fd",
    "index": 0,
    "guid": "87cfbb5d-71fb-45a7-b268-1df181da901c",
    "isActive": true,
    "balance": "$3,583.12",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "brown",
    "nullTestValue": null,
    "arrayWithNulls": [null, null, null],
    "objectWithNulls": {
        "firstNullValue": null,
        "secondNullValue": null
    },
    "name": "Becky Vega",
    "gender": "female",
    "company": "ZOID",
    "email": "beckyvega@zoid.com",
    "phone": "+1 (957) 480-3973",
    "address": "426 Hamilton Avenue, Holtville, New Hampshire, 3431",
    "about": "Duis do occaecat commodo velit exercitation aliquip mollit ad reprehenderit non cupidatat dolore ea nulla. Adipisicing ea voluptate qui sunt non culpa labore reprehenderit qui non. Eiusmod ad do in quis cillum sint pariatur. Non laboris ullamco ea voluptate et anim qui quis id exercitation mollit ullamco dolor incididunt. Ad consequat anim velit culpa. Culpa Lorem eiusmod cupidatat dolore aute quis sint ipsum. Proident voluptate occaecat nostrud officia.\r\n",
    "registered": "2016-11-19T01:14:28 -01:00",
    "latitude": -80.66618,
    "longitude": 65.090852,
    "tags": [
        "ea",
        "officia",
        "fugiat",
        "anim",
        "consequat",
        "incididunt",
        "est"
    ],
    "friends": [
        {
            "id": 0,
            "name": "Genevieve Cooke",
            "ownFriends": {
                "1": "Rebbeca",
                "2": "Julia",
                "3": "Chopper only"
            },
        },
        {
            "id": 1,
            "name": "Eaton Buck"
        },
        {
            "id": 2,
            "name": "Darla Cash"
        }
    ],
    "greeting": "Hello, Becky Vega! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
}

export default function Dashboard() {
    return(
        <div>
            <div className={"p-2 bg-white"}>
                <span className={"display-5"} id={"company-name"}>Garmic Fleet Managers</span>
            </div>
            <div className={"summary-items container-fluid row m-0 p-3 bg-white"}>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Inputs</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Processors</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Geofences</span>
                    </div>
                </div>
                <div className={"col-lg-3 col-md-3 col-sm-6 col-6 m-0 p-0"}>
                    <div className={"m-2 p-2 border rounded pointer top-summary-div"}>
                        <span className={"display-6"}>Live Objects</span>
                    </div>
                </div>
            </div>
            <div id={"live-objects-heatmap"}>
                <MyMap height={"600px"}/>
            </div>
            <RecursiveProperty property={testJson} propertyName="Root Property" excludeBottomBorder={false} rootProperty={true}/>
        </div>
    );
}