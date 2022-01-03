import { MapContainer, TileLayer } from 'react-leaflet'
export default function MyMap({component= null}){
    return <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: "100vh", width: "100%"}}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {component}
    </MapContainer>
}