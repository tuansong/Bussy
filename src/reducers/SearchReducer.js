const initialState = {
  places: [],
  buses: [],
  busInfo: []
};
export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PLACES" :
      return {
        ...state,
        places: action.data,
      };
    case "GET_BUSES" :
      return {
        ...state,
        buses: action.data,
      };
    case "SORT_PRICE_BUSES": 
      return {
        ...state,
        buses: action.busesData,
      };
    case "GET_BUS_INFO":
      return {
        ...state,
        busInfo: action.data
      };
    case "UPDATE_SEAT_STATUS" : 
      return {
        ...state,
				listSeatBooked: state.listSeatBooked.map(
          (seat, index) => index === action.index && seat !== 1 ? 
          seat === 0 ? 2 : 0 : seat)
      }
    default:
      return state;
  }
};