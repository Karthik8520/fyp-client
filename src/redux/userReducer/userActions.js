exports.setUser = (data)=>{
    return({
        type: "SET_USER",
        payload: data
    })
}

exports.signout = (data)=>{
    return({
        type: "SIGN_OUT",
        payload: data
    })
}