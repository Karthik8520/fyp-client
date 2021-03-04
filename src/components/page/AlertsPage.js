import {Component} from "react"
import axios from "axios"
import {connect} from "react-redux"
import AlertCard from "../AlertCard/AlertCard"
import Header from "../Header/Header"
import {withRouter} from "react-router-dom"

class Alerts extends Component{

    constructor(){
        super();
        this.state = {
            data : null
        }
    }

    async componentDidMount(){
        //console.log("token: ", this.props.token);
        const res = await axios.get("http://localhost:7000/api/v1/vehicle/alerts/all", {
            headers : {
                token : this.props.token
            }
        })
        console.log("response : ",res);
        this.setState({data: res.data.data});
    }

    render(){
        return(
            <div>
                <div>
                    <Header />
                </div>

                <div>
                    {
                        this.props.token==null ? this.props.history.push("/") 
                        : 
                        this.state.data == null ? 
                        <div>Loading...</div> 
                        :
                        <div>
                            {
                                this.state.data.length==0 ? 
                                <div><h3>No alerts!</h3></div>
                                :
                                <div id="alert-page-card-div">
                                    <h1>Alerts</h1>
                                    <AlertCard data={this.state.data} />
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    if(state.currentUser.user==null)
    {
        return  {token:null}
    }
    else{
        return {token : state.currentUser.user.token}
    }
}

export default withRouter(connect(mapStateToProps)(Alerts))