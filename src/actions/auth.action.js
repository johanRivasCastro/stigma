import { AuthService } from "../services";

const endPoint = "login/";


const login = (email, password) =>{
    const payload = {
        email,
        password
    }
    return dispatch =>{
        AuthService.post(endPoint, payload)
        .then(response =>{
            if(response.token){
                localStorage.setItem("jtoken",response.token)
            }
            dispatch(setCurrentUser(response.token));
        })
    }
}

const setCurrentUser = (token) =>{
    return {
        type:"LOGIN_SUCCESS",
        token:token
    } 
}


export const loginActions = {
  login
};
