import {combineReducers} from "redux"
import userReducer from "./userReducer/userReducer"


const rootReducer = combineReducers({
    currentUser : userReducer
})


export default rootReducer;
