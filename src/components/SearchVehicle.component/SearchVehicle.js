import {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import VehiclePage from "../page/Vehicle.page"

class SearchVehicle extends Component{

    constructor(){
        super();
        this.state = {
            search : ""
        }
    }

    handleSearch = async (e)=>{
        e.preventDefault();
        const search = String(this.state.search).replace(/ /g,'').toUpperCase();
        if(search.length==0)
        {
            alert("Input vehicle number!!");
            return;
        }
        this.props.history.push(`/vehicle/${search}`);     
    }

    handleChange = (e)=>{
        this.setState({search: e.target.value});
    }


    render(){

        return(
            <div>
                <input type="text" placeholder="e.g. GJ0205" onChange={this.handleChange} />
                <button onClick={this.handleSearch}>Search Vehicle</button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    token : state.currentUser.user.token
})


export default withRouter(connect(mapStateToProps)(SearchVehicle))