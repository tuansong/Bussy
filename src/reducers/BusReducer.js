const initialState = {
    busInfo : [1,2,3,4]
}

export const BusReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'GET_BUS_INFO' : {
            console.log(action.data);
            return {
                ...state,
                busInfo : action.data
            }
        }
        default:
            return state
    }
    return state
}
