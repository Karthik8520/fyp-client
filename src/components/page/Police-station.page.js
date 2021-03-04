import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import PoliceHomeComponent from "../Police.home.component/Police.home.component"


const policeStationPage = (props)=>{
    console.log(props.role)
    const role = props.role
    return (
        props.role==="police-station" ? 

        <PoliceHomeComponent />
        
        : 
        <div>
            {props.history.push("/")}
        </div>
    )
}

const mapStateToProps = (state)=>{
    if(state.currentUser.user===null)
    {
        return {role: null}
    }
    else{
        return {role : state.currentUser.user.role}
    }
    
}

export default withRouter(connect(mapStateToProps)(policeStationPage))