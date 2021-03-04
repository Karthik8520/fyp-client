import {connect} from "react-redux"
import { withRouter } from "react-router-dom"
import TollComponent from "../TollComponent/TollComponent"
import Header from "../Header/Header"

const tollBoothPage = (props)=>{
    return (
        props.role==="toll-booth" ? 
        <div id="toll-page-div">
            <Header />
            <TollComponent />
        </div>

        : 

        <div>
            {
                props.history.push("/")
            }
        </div>

    )
}

const mapStateToProps = (state)=>{
    if(state.currentUser.user == null)
    {
        return {role:null}
    }
    else{
        return {role : state.currentUser.user.role}
    }
    
}

export default withRouter(connect(mapStateToProps)(tollBoothPage))