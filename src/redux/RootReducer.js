import {combineReducers} from "redux";
import userReducer from "./userReducer/userReducer";
import otpReducer from "./otpReducer/otp_Reducer";


const rootReducer = combineReducers({
    currentUser : userReducer,
    otpUser : otpReducer
})


export default rootReducer;
