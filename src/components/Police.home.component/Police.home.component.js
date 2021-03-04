import {Component} from "react"
import ReportedComponent from "../Reported.component/Reported.component"
import axios from "axios"
import {connect} from "react-redux"
import SearchVehicle from "../SearchVehicle.component/SearchVehicle"
import {withRouter} from "react-router-dom"
import Header from "../Header/Header"
import "./Police.home.component.css"

class PoliceHomeComponent extends Component{

    constructor(){
        super();
        this.state = {
            reportedData : null
        }
    }

    async componentDidMount(){
        console.log("PoliceHomeComp componentDidMount()called")
        const res = await axios.get("http://localhost:7000/api/v1/vehicle/reports/all", {
            headers : {
                token : this.props.token
            }
        });

        // res.data.data contains array.
        console.log(res.data.data);
        this.setState({reportedData: res.data.data});
    }

    toAlert = (e)=>{
        e.preventDefault();
        this.props.history.push("/alerts");
    }

    render(){
        return (
            <div id="police-home">
                <Header />
                <div id="top-police-home">
                    <SearchVehicle />
                    <button onClick={this.toAlert}>View Alerts</button>
                </div>
                {
                    this.state.reportedData==null ? <h4>Loading...</h4> : 
                    <div>
                        <ReportedComponent data={this.state.reportedData} />
                    </div>
                    
                }
            </div>
        )
    }

}

const mapStateToProps = (state)=>({
    token : state.currentUser.user.token
})

export default withRouter(connect(mapStateToProps)(PoliceHomeComponent))