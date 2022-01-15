import moment from "moment"
export default function FeatureTable({features}) {
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
                        <td><small>{JSON.stringify(feature.properties.data)}</small></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}