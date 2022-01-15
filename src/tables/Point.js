export default function PointTable({features}) {
    return(
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
    )
}