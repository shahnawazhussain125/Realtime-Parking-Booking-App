import firebase from '../../config/firebase';
export const getAllUsers = () =>{
    let allUsers = []
    return(dispatch) =>{
        firebase.firestore().collection('users')
        allUsers = []
        .onSnapshot((snapShot) =>{
            snapShot.forEach(doc =>{
                allUsers.push(doc.data())
            })
            dispatch({ type: "GET_ALL_USERS_SUCCESS", allUsers, getAllUsersError: null });
        }, (error =>{
            dispatch({ type: "GET_ALL_USERS_ERROR", getAllUsersError: error})
        })
        )
    }
}

export const getAllBookings = () =>{
    let allBookings = []
    return(dispatch) =>{
        firebase.firestore().collection('bookings')
        .onSnapshot((snapShot) =>{
            allBookings = []
            snapShot.forEach(doc =>{
                allBookings.push(doc.data())
            })
            dispatch({ type: "GET_ALL_BOOKINGS_SUCCESS", allBookings, getAllBookingsError: null });
        }, (error =>{
            dispatch({ type: "GET_ALL_BOOKINGS_ERROR", getAllBookingsError: error})
        })
        )
    }
}

export const getAllFeedbacks = () =>{
    
    let allFeedbacks = []
    return(dispatch) =>{
        firebase.firestore().collection('feedbacks')
        .onSnapshot((snapShot) =>{
            allFeedbacks = []
            snapShot.forEach(doc =>{
                allFeedbacks.push(doc.data())
            })
            dispatch({ type: "GET_ALL_FEEDBACKS_SUCCESS", allFeedbacks, getAllFeedbacksError: null });
        }, (error =>{
            dispatch({ type: "GET_ALL_FEEDBACKS_ERROR", getAllFeedbacksError: error})
        })
        )
    }
}