import {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import VehicleCard from "../VehicleCard/VehicleCard"
import Header from "../Header/Header"

class VehiclePage extends Component{

    constructor(){
        super();
        this.state = {
            vehData : null
        }
    }

    async componentDidMount(){
       try{
           
           const number  = this.props.match.params.number;
            const res = await axios.get(`http://localhost:7000/api/v1/vehicle/${number}`, {
                headers : {
                    token : this.props.token
                }
            })
            console.log(res.data.data);
            const data = res.data.data;
            this.setState({vehData: data});
       }
       catch(err){
           console.log(err);
            
            if(err.response.data.err === "Vehicle does not exist")
            {
                alert(err.response.data.err)
                document.getElementById("veh-loading").innerText = "No record found."
                document.getElementById("veh-loading").style.color = "red"
                document.getElementById("veh-loading").style.fontWeight = "bold"
            }
            else if(err.response.data.err.message=== "jwt malformed")
            {
                console.log("Error was  : ", err.response.data.err.message)
                this.props.history.push("/");
            }
            else{
                console.log("Error was",err.response);
                document.getElementById("veh-loading").innerText = "Something went wrong."
                document.getElementById("veh-loading").style.color = "red"
                document.getElementById("veh-loading").style.fontWeight = "bold"
            }
            
       }
    }

    render(){
        return (
            <div id="vehicle-page-div">
                <Header />
                <h1>Vehicle details</h1>
                {
                    this.state.vehData==null ? <div id="veh-loading">Loading...</div> 
                    : 
                    <div>
                        <VehicleCard data={this.state.vehData} />
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    if(state.currentUser.user==null)
    {
        return {token:null}
    }
    else{
        return {token : state.currentUser.user.token}
    }
}

export default withRouter(connect(mapStateToProps)(VehiclePage));


