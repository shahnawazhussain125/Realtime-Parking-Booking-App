const defaultState = {
    user: null,
    name: null,
    userType: null,
    isError: null,
    deleteBookingError: null,
}

const authReducer = (state = defaultState, action)=>{
    switch (action.type) 
    {
        case "SIGNUP_SUCCESS":
            return({
                ...state,
                user: action.user, 
                name: action.name,
                userType: action.userType,
                isError: false,
                signUpError: null,
            })
        case "SIGNUP_ERROR":
            return({
                ...state,
                signUpError: action.signUpError,
                isError: true,
                user: null,
            })
        case "SIGNIN_SUCCESS":
            return({
                ...state,
                user: action.user, 
                name: action.name,
                userType: action.userType
            })
        case "SIGNIN_ERROR":
            return({
                ...state,
                user: null,
                userType: null,
                isError: true,
                signInError: action.signInError
            })
        case "SIGNOUT_SUCCESS":
            return({
                state: defaultState,
            })
        case "SIGNOUT_ERROR":
            return({
                ...state,
                signOutError: action.signOutError,
            })
        default:
            return state
    }
}

export default authReducer;