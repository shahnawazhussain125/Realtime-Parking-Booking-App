import firebase from '../../config/firebase';

export const setBooking = ( bookingData ) =>{
    return(dispatch) =>{
        firebase.firestore().collection('bookings')
        .add({
            startingTime: bookingData.startingTime,
            endingTime: bookingData.endingTime,
            date: bookingData.date,
            userId: bookingData.userId,
            area: bookingData.area,
            slot: bookingData.slot
        })
        .then(()=>{
            alert("Successfully submitted");
            dispatch({type: "BOOKING_SUCCESS", bookingError: null})
        })
        .catch((error) =>{
            dispatch({type: "BOOKING_ERROR", bookingError: error})
        })
    }
}

export const getBooking = () =>{
    let bookedData = [];
    return(dispatch) =>{
        firebase.firestore().collection("bookings")
        .onSnapshot(snapShot =>{
            bookedData = [];
            snapShot.forEach(doc =>{
                bookedData.push({ ...doc.data(), id: doc.id});
            })
            dispatch({type: "GETBOOKED_DATA_SUCCESS", bookedData })
        }, (error) =>{
            dispatch({type: "GETBOOKED_DATA_ERROR", getBookedDataError: error })
        })
    }
}

export const deleteBooking = (id) =>{
    return(dispatch) =>{
        firebase.firestore().collection('bookings').doc(id)
        .delete()
        .then(()=>{
            dispatch({ type: "DELETE_BOOKING_SUCCESS", deleteBookingError: null})
        })
        .catch((error) =>{
            dispatch({ type: "DELETE_BOOKING_ERROR", deleteBookingError: error})
        })
    }
}

export const setFeedback = ( feedbackData ) =>{
    return(dispatch) =>{
        firebase.firestore().collection('feedbacks')
        .add({
            message: feedbackData.message,
            username: feedbackData.username,
            date: feedbackData.date,
            userId: feedbackData.userId,
        })
        .then(()=>{
            alert("Successfully submitted");
            dispatch({type: "FEEDBACK_SUCCESS", feedbackError: null})
        })
        .catch((error) =>{
            dispatch({type: "FEEDBACK_ERROR", feedbackError: error})
        })
    }
}

export const myFeedback = (userId) =>{
    return(dispatch) =>{
        let myfeedback = [];
        firebase.firestore().collection('feedbacks')
        .where("userId", "==", userId)
        .onSnapshot(snapShot =>{
            myfeedback = [];
            snapShot.forEach(doc =>{
                myfeedback.push({ ...doc.data(), id: doc.id});
            })
            dispatch({type: "GETFEEDBACK_DATA_SUCCESS", myfeedback, getMyFeedbackError: null})
        }, (error) =>{
            dispatch({type: "GETFEEDBACK_DATA_ERROR", getMyFeedbackError: error })
        })

    }
}

