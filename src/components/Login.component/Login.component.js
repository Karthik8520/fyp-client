import {Component} from "react"
import axios from "axios";
import {setUser} from "../../redux/userReducer/userActions"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Header from '../Header/Header'
import "./login.css"


class login extends Component{

    constructor(){
        super();
        this.state = {
            email : "",
            password : ""
        }
        
    }

    handleLogin = async (e)=>{
        try{
            e.preventDefault();
            // console.log(this.state)
            const data = {
                email: this.state.email,
                password: this.state.password
            }

            const res = await axios.post("http://localhost:7000/api/v1/user/login", data);
            //res.data.token containe token
            let userRole = await axios.get("http://localhost:7000/api/v1/user/role", {
                headers:{
                    token : res.data.token
                }
            })
            userRole = userRole.data.data;
            console.log(userRole);
            this.props.setUser({
                token: res.data.token,
                role: userRole
            })
            userRole==="police-station" ? this.props.history.push("/stationPage") : this.props.history.push("/tollPage");    
        }
        catch(err){
            alert(err.response.data.err);
        }
    }

    handleChange = (e)=>{
        // console.log("Value :",e.target.value);
        // console.log("name :", e.target.name);
        this.setState({[e.target.name] : e.target.value});
    }

    componentDidMount(){
        console.log("Login componentDidMount called");
        window.localStorage.removeItem("persist:root");
        this.props.setUser(null);
    }

    render(){
        console.log("Login Component render methode called");
        return (
            <div id="login-container">
                <Header />
                <div id="login-div" className="card-login">
                    <div className="login-grid">
                        Email  <input type="text" name="email" onChange={this.handleChange} />
                        Password  <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
                
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch)=>({
    setUser : (data)=>{dispatch(setUser(data))}
})

export default connect(null, mapDispatchToProps)(withRouter(login))