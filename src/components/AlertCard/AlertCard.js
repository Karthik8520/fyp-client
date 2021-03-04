import "./AlertCard.css"
import Header from "../Header/Header"


const AlertCard = (props)=>{
    
    return (
        <div>
            <div>
                {
                    props.data.map((veh_alert)=>{
                        const date = new Date(veh_alert.passedAt).toDateString();
                        const time = new Date(veh_alert.passedAt).toLocaleTimeString();
                        return (
                            <div className="alert-card-div">
                                <div className="veh-grid">
                                    <p>Number</p>
                                    <p>{veh_alert.number}</p>

                                    <p>Owner</p>
                                    <p>{veh_alert.owner}</p>

                                    <p>Address</p>
                                    <p>{veh_alert.address}</p>
                                </div>
                                <br />
                                <b>Stolen vehicle Reported at</b>
                                <div className="veh-grid">
                                    <p>Name</p>
                                    <p>{veh_alert.stealReportedAt.name}</p>

                                    <p>Address</p>
                                    <p>{veh_alert.stealReportedAt.address}</p>
                                </div>

                                {
                                    veh_alert.lastSeenAt == undefined ? 
                                    null
                                    : 
                                    <div>
                                        <br />
                                        <b>Last Seen at</b>
                                        <div className="veh-grid">
                                            <p>Name</p>
                                            <p>{veh_alert.lastSeenAt.name}</p>

                                            <p>Address</p>
                                            <p>{veh_alert.lastSeenAt.address}</p>

                                            <p>Passed at</p>
                                            <p>{`${date},  ${time}`}</p>
                                        </div>

                                    </div>
                                }
                                {/* <hr /> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AlertCard;