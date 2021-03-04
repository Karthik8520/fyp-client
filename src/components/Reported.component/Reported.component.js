import ReportCard from "../ReportCard/ReportCard"
import "./Reported.component.css"

const ReportedComponent = (props)=>{
    return (
        <div id="reportComp">
            <h1>Vehicles reported to us.</h1>
            {
                props.data.map((report)=>(
                    <ReportCard key={report._id} data={report} />
                ))
            }
        </div>
    )
}

export default ReportedComponent