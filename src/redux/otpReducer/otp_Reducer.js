const init_data = {
    otp_user : null
}

const otpReducer = (prevState=init_data, action)=>{
    switch(action.type)
    {
        case "SET_OTP_USER":
            return ({
                ...prevState,
                otp_user : action.payload
            })
            break;
        default:
            return prevState
    }
}

export default otpReducer;