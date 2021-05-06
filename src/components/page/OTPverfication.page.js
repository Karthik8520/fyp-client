import {connect} from "react-redux"
import axios from "axios"
const {useState} = require("react");





function OTP_page(props){

    const [otp, setOTP] = useState("");
    console.log("props token: ", props)
    console.log(props.otp_data); // contains mobileNumber, id and number(vehicle number), action

    async function createReport(id, number, token){
        const data = {
            id,
            number
        }
        await axios.post("http://localhost:7000/api/v1/vehicle/stolen/", data, {
                    headers : {
                        token 
                    }
        })
    }

    async function deleteReport(id, number, tokem){
        await axios.delete(`http://localhost:7000/api/v1/vehicle/delete/${number}/${id}`, {
                headers : {
                    token : props.token
                }
            });
    }


    const handleClick = async (e)=>{
        e.preventDefault();
        // check from db if the entered OTP is correct
        console.log(props.otp_data);
        const data = {
            otp,
            user_id : props.otp_data.id,
            number : props.otp_data.number,
            action : props.otp_data.action
        }
        const response = await axios.post("http://localhost:7000/api/v1/otp/check   ", data, {
            headers: {
                token: props.token
            }
        })
        console.log(response);
        if(response.data.result=="correct" && data.action=="createReport")
        {
            // create stolen report
            await createReport(data.user_id, data.number, props.token)
            alert("Report Created Successfully!");
            props.history.push("/stationPage");
        }
        else if(response.data.result=="correct" && data.action=="deleteReport")
        {
            await deleteReport(data.user_id, data.number, props.token);
            alert("Report deleted successfully");
            props.history.push("/stationPage");
        }
        else{
            alert("Incorrect OTP entered");
        }
    }

    return (
        <div>
            <h2>OTP Verification</h2>
            <p>You will receive OTP in your registered mobile number</p>
            <input type="text" onChange = {(e)=>setOTP(e.target.value)} />
            <button onClick={handleClick} >Submit</button>
        </div>
    )
}

const mapStateToProps = (state)=>({
    token : state.currentUser.user.token,
    otp_data : state.otpUser.otp_user
})

export default connect(mapStateToProps)(OTP_page);