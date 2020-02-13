const token = '';

const initialState ={
    loggedIn:false,
    token
}


export const authentication = (state = initialState, action) =>{

    switch(action.type){
        case "LOGIN_SUCCESS":{
            return {
                loggedIn:true,
                token:action.token
            }
        }
        default:{
            return state;
        }
    }

}