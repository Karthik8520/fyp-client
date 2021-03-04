import "./ReportCard.css"

const ReportCard = (props)=>{
    return (
        <div className="report-card">
            <h2>{props.number}</h2>
            <div className="report-card-grid">
                <p><b>Vehicle number</b></p>
                <p>{props.data.number}</p>

                <p><b>Owner</b></p>
                <p>{props.data.owner}</p>

                <p><b>Address</b></p>
                <p>{props.data.address}</p>

                
            </div>
        </div>
    )
}

export default ReportCard;