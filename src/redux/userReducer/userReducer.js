const initial_data = {
    user : null
}

const userReducer = (prevState=initial_data, action)=>{

    switch(action.type){

        case "SET_USER":
            return({
                ...prevState,
                user : action.payload
            });
            break;
        
        case "SIGN_OUT":
            window.localStorage.removeItem("persist:root");
            return ({
                ...prevState,
                user : action.payload
            })
            break;
        
        default :
            return prevState

    }
}

export default userReducer;


