import firebase from '../../config/firebase';

export const signUp = (userData) =>{
    return(dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then((response) =>{
            firebase.firestore().collection('users')
            .doc(response.user.uid)
            .set({
                name: userData.name,
                email: userData.email,
                uid: response.user.uid,
                userType: "user",
            })
            .then(() =>{
                dispatch({type: "SIGNUP_SUCCESS", user: response.user, name: userData.name, userType: "user"})
            })
        })
        .catch((error) =>{
            dispatch({ type: "SIGNUP_ERROR", signUpError: error})
        })
    }
}

export const signIn = (userData) =>{
    return(dispatch) => {
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then((response) =>{
            firebase.firestore().collection('users')
            .doc(response.user.uid)
            .onSnapshot((doc) =>{
                    dispatch({type: "SIGNIN_SUCCESS", user: response.user, name: doc.data().name, userType: doc.data().userType})
            },
            (error) =>{
                dispatch({ type: "SIGNIN_ERROR", signInError: error})
            })
        })
        .catch(error =>{
            dispatch({ type: "SIGNIN_ERROR", signInError: error})
        })
    }
}   
export const signOut = () =>{
    return(dispatch)=>{
        firebase.auth().signOut()
        .then(() =>{
            dispatch({type: "SIGNOUT_SUCCESS"})
        })
        .catch((error) =>{
            dispatch({ type: "SIGNOUT_ERROR", signOutError: error})
        })
    }
}