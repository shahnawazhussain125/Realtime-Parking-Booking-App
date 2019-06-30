const initialState = {
    allUsers: [],
    allBookings: [],
    getAllUsersError: null,
    getAllBookingsError: null,
}

const adminReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case "GET_ALL_USERS_SUCCESS":
            return({
                ...state,
                allUsers: action.allUsers, 
                getAllUsersError: action.getAllUsersError,
            })
        case "GET_ALL_USERS_ERROR":
            return({
                ...state,
                allUsers: [], 
                getAllUsersError: action.getAllUsersError,
            })
        case "GET_ALL_BOOKINGS_SUCCESS":
            return({
                ...state,
                allBookings: action.allBookings, 
                getAllBookingsError: action.getAllBookingsError,
            })
        case "GET_ALL_BOOKINGS_ERROR":
            return({
                ...state,
                allBookings: [], 
                getAllBookingsError: action.getAllBookingsError,
            })
        case "GET_ALL_FEEDBACKS_SUCCESS":
            return({
                ...state,
                allFeedbacks: action.allFeedbacks, 
                getallFeedbacksError: action.getallFeedbacksError,
            })
        case "GET_ALL_FEEDBACKS_ERROR":
            return({
                ...state,
                allFeedbacks: [], 
                getallFeedbacksError: action.getallFeedbacksError,
            })
        default:
            return state;
    }
}

export default adminReducer;