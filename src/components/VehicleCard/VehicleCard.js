import "./VehicleCard.css"
import axios from "axios";
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {create_otp_user} from "../../redux/otpReducer/otpActions"





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

    // async function handleDeleteReport(e, veh_id, veh_number){
    //    try{
    //         e.preventDefault();
    //         await axios.delete(`http://localhost:7000/api/v1/vehicle/delete/${veh_number}/${veh_id}`, {
    //             headers : {
    //                 token : props.token
    //             }
    //         });
    //         alert("Report Deleted Successfully!");
    //         props.history.push("/stationPage");
    //         //console.log("token", props.token)
    //    }
    //    catch(err){
    //         alert("Some Error occurred!");
    //    }
    // }

    async function handleDeleteReport(e, id, number, mobileNumber)
    {
        e.preventDefault();

        const data = {
            id,
            number,
            mobileNumber,
            action: "deleteReport"
        }

        //api call to generate and save OTP in user's db  
        await axios.get(`http://localhost:7000/api/v1/otp/gen/?id=${id}&number=${number}&action=${data.action}&phone=${data.mobileNumber}`, {
                headers : {
                    token : props.token
                }
        })

        props.SetOtpUser(data);
        props.history.push("/otp");
    }



    async function handleCreateReport (e, id, number, mobileNumber){

        const data = {
            id,
            number,
            mobileNumber,
            action: "createReport"
        }

        //api call to generate and save OTP in user's db  
        await axios.get(`http://localhost:7000/api/v1/otp/gen/?id=${id}&number=${number}&action=${data.action}&phone=${data.mobileNumber}`, {
                headers : {
                    token : props.token
                }
        })

        


        props.SetOtpUser(data);
        props.history.push("/otp")
    }

    
    return (
        <div className="total-veh-card">
            <div id="base-veh-data">
                <div className="veh-grid">
                    <p><b>Number</b></p>
                    <p>{props.data.number}</p>

                    <p><b>Owner</b></p>
                    <p>{props.data.owner}</p>

                    <p><b>Mobile number</b></p>
                    <p>{props.data.mobileNumber}</p>

                    <p><b>Address</b></p>
                    <p>{props.data.address}</p>

                </div>
                <button type="button" className={isStolen()} onClick={(e)=>{handleCreateReport(e, props.data._id, props.data.number, props.data.mobileNumber)}} >Mark Stolen</button>
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

                    <button type="button"  onClick={(e)=>{handleDeleteReport(e, props.data._id, props.data.number, props.data.mobileNumber)}}>Delete Report</button>


                </div>
                
            }

        </div>
    )
}

const mapStateToProps = (state)=>({
    token : state.currentUser.user.token
})

const mapDispatchToProps = (dispatch)=>({
    SetOtpUser : data=>(dispatch(create_otp_user(data)))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(vehicleCard))


