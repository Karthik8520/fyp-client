import "./VehicleCard.css"
import axios from "axios";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"




const vehicleCard = (props)=>{
    let date, time;
    if(props.data.passedAt)
    {
        date = new Date(String(props.data.passedAt)).toLocaleDateString();
        time = new Date(String(props.data.passedAt)).toLocaleTimeString();
    }
    
    function isStolen(){
        if(props.data.stealReportedAt==undefined)
        {
            return "";
        }
        else{
            return "hidden";
        }
    }

    async function handleDeleteReport(e, veh_id, veh_number){
       try{
            e.preventDefault();
            await axios.delete(`http://localhost:7000/api/v1/vehicle/delete/${veh_number}/${veh_id}`, {
                headers : {
                    token : props.token
                }
            });
            alert("Report Deleted Successfully!");
            props.history.push("/stationPage");
            //console.log("token", props.token)
       }
       catch(err){
            alert("Some Error occurred!");
       }
    }

    async function handleCreateReport(e, veh_id, veh_number){
        try{
            e.preventDefault();
            console.log("id : ", veh_id, " number : ", veh_number);

            const data = {
                id :veh_id,
                number: veh_number
            }

            axios.post("http://localhost:7000/api/v1/vehicle/stolen/", data, {
                headers : {
                    token : props.token
                }
            })

            alert("Report Created Successfully!");
            props.history.push("/stationPage");
        }
        catch(err){
            alert("Some Error occurred!");
        }
    }

    
    return (
        <div className="total-veh-card">
            <div id="base-veh-data">
                <div className="veh-grid">
                    <p><b>Number</b></p>
                    <p>{props.data.number}</p>

                    <p><b>Owner</b></p>
                    <p>{props.data.owner}</p>

                    <p><b>Address</b></p>
                    <p>{props.data.address}</p>

                </div>
                <button type="button" className={isStolen()} onClick={(e)=>{handleCreateReport(e, props.data._id, props.data.number)}} >Mark Stolen</button>
            </div>
            {
                props.data.stealReportedAt==undefined ? 
                <div></div> 
                : 
                <div id="steal-veh-data">
                    <hr />
                    <div className="stolen-veh-grid">
                        <b>Stolen Vehicle</b>

                        <div className="veh-grid">
                            <p><b>Reported at</b></p>
                            <p>{props.data.stealReportedAt.name}</p>
                            <p><b>Address</b></p>
                            <p>{props.data.stealReportedAt.address}</p>
                        </div> 
                    </div>

                    <div className="stolen-veh-grid">
                        
                        {
                            props.data.lastSeenAt==undefined ? 
                            <div></div>
                            :
                            <div>
                                <hr />
                                <b>Last seen at</b>

                                <div className="veh-grid">
                                    <p><b>Toll Booth</b></p>
                                    <p>{props.data.lastSeenAt.name}</p>
                                    <p><b>Address</b></p>
                                    <p>{props.data.lastSeenAt.address}</p>
                                    <p><b>At</b></p>
                                    <p>{`${date},  ${time}`}</p>
                                </div> 
                            </div>
                        }
                    </div>

                    <button type="button"  onClick={(e)=>{handleDeleteReport(e, props.data._id, props.data.number)}}>Delete Report</button>


                </div>
                
            }

        </div>
    )
}

const mapStateToProps = (state)=>({
    token : state.currentUser.user.token
})


export default withRouter(connect(mapStateToProps)(vehicleCard))


