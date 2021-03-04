import axios from "axios";
import {connect} from "react-redux"
import "./toll.css"

const tollcomp = (props)=>{

    async function handleSubmit(e){
        e.preventDefault();
        console.log("Submit button clicked");
        const img = document.getElementById("num-plate").files[0];

        const formData = new FormData();
        formData.append('num-plate', img);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                token : props.token
                
            }
        };

        await axios.post("http://localhost:7000/api/v1/vehicle/upload/img/", formData, config);
        alert("Done!");
    }

    return (
        <div id="toll-comp">
            <div>
                <h1>Toll-Booth</h1>
                <div>
                    <input id="num-plate" type="file" /> <br />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            
        </div>
    )
}


const mapStateToProps = (state)=>({
    token : state.currentUser.user.token
})


export default connect(mapStateToProps)(tollcomp)